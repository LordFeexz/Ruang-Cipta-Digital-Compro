// Optional local browser regression check; no project dependencies required.
// Provide an existing Playwright installation through PLAYWRIGHT_MODULE when
// it is not available on Node's module path. See docs/public-ui-review.md.
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const origin = process.env.PUBLIC_UI_ORIGIN || "http://127.0.0.1:4321";
assert(["localhost", "127.0.0.1"].includes(new URL(origin).hostname), "Use a local server only.");
const output = process.env.PUBLIC_UI_OUTPUT || "/tmp/rcd-public-ui";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
});
const context = await browser.newContext();
const page = await context.newPage();
async function navigate(path) {
  const response = await page.goto(origin + path);
  await page.waitForFunction(() => [...document.querySelectorAll('astro-island[client="load"]')].every((island) => !island.hasAttribute("ssr")));
  await page.locator("main h1").waitFor();
  return response;
}
const errors = [];
const apiRequests = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("request", (request) => {
  if (new URL(request.url()).pathname.startsWith("/api/")) apiRequests.push(request.url());
});
// Prevent accidental outbound requests; this test supplies no response data.
await context.route("**/*", (route) => {
  const url = new URL(route.request().url());
  return url.origin === origin || ["data:", "blob:"].includes(url.protocol)
    ? route.continue() : route.abort();
});
const routes = ["", "/products", "/career-mate", "/digitool", "/packages", "/about", "/contact", "/transaction/finish"];
let responsiveChecks = 0;
try {
  for (const lang of process.argv.includes("--interactions-only") ? [] : ["id", "en"]) {
    for (const route of routes) {
      for (const width of [320, 375, 390, 768, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        const response = await navigate("/" + lang + route);
        assert.equal(response.status(), 200, lang + route);
        await page.evaluate(() => document.fonts.ready);
        const dimensions = await page.evaluate(() => ({
          viewport: window.innerWidth,
          scroll: document.documentElement.scrollWidth,
          headings: document.querySelectorAll("h1").length,
          brokenImages: [...document.images].filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.src),
        }));
        assert(dimensions.scroll <= dimensions.viewport, "Overflow: " + lang + route + " @ " + width);
        assert.equal(dimensions.headings, 1);
        assert.equal(await page.locator('link[rel="icon"]').getAttribute("href"), "/brand/rcd-logo.png");
        assert.deepEqual(dimensions.brokenImages, []);
        assert.equal(await page.locator("body").evaluate((element) => getComputedStyle(element).backgroundColor), "rgb(8, 12, 20)");
        if (lang === "id" && [375, 1440].includes(width)) {
          await page.screenshot({ path: join(output, (route.slice(1) || "home") + "-" + width + ".png"), fullPage: true });
        }
        responsiveChecks++;
      }
      await page.reload();
      await page.locator("main h1").waitFor();
      assert.equal(await page.locator("h1").count(), 1, "Direct reload: " + lang + route);
    }
  }

  await page.setViewportSize({ width: 375, height: 812 });
  await navigate("/id/products");
  await page.getByRole("button", { name: "Packages", exact: true }).click();
  assert.equal(await page.getByRole("button", { name: "Packages", exact: true }).getAttribute("aria-pressed"), "true");
  await page.getByRole("heading", { name: "traffic-tracker", exact: true }).waitFor();
  assert.equal(await page.locator("main h2").count(), 1);
  const packageTrigger = page.getByRole("button", { name: "Lihat detail traffic-tracker" });
  await packageTrigger.click();
  const packageDialog = page.getByRole("dialog", { name: "traffic-tracker" });
  await packageDialog.waitFor();
  assert.equal(await packageDialog.getByRole("link", { name: /Lihat di npm/ }).getAttribute("href"), "https://www.npmjs.com/package/traffic-tracker?activeTab=readme");
  assert.equal(await packageDialog.getByRole("link", { name: /Repository/ }).getAttribute("href"), "https://github.com/LordFeexz/traffic-tracker");
  await page.keyboard.press("Escape");
  await packageDialog.waitFor({ state: "detached" });
  assert.equal(await packageTrigger.evaluate((element) => element === document.activeElement), true, "Package dialog restores focus");
  await page.getByRole("button", { name: "Semua karya", exact: true }).click();
  assert.equal(await page.locator("main h2").count(), 3);
  await page.getByRole("button", { name: "Eksperimen", exact: true }).click();
  await page.getByText("Belum ada eksperimen yang ditampilkan di sini.").waitFor();
  await page.getByRole("button", { name: "Lihat semua karya" }).click();
  assert.equal(await page.locator("main h2").count(), 3);
  await page.getByRole("button", { name: "Aplikasi", exact: true }).click();
  assert.equal(await page.locator("main h2").count(), 2);

  await navigate("/id/packages");
  for (const viewport of [{ width: 320, height: 568 }, { width: 375, height: 812 }, { width: 1440, height: 900 }]) {
    await page.setViewportSize(viewport);
    if (viewport.width === 320) await page.screenshot({ path: join(output, "packages-320.png"), fullPage: true });
    await packageTrigger.click();
    await packageDialog.waitFor();
    await packageDialog.evaluate((element) => Promise.all(element.getAnimations({ subtree: true }).map((animation) => animation.finished)));
    assert.equal(await packageDialog.evaluate((element) => element.scrollTop), 0, "Package dialog opens at its heading");
    assert(await packageDialog.evaluate((element) => element.getBoundingClientRect().right <= innerWidth), "Package dialog fits viewport");
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "No overflow while package dialog is open");
    await page.screenshot({ path: join(output, "package-dialog-" + viewport.width + ".png") });
    await packageDialog.getByRole("button", { name: "Tutup", exact: true }).click();
    await packageDialog.waitFor({ state: "detached" });
    assert.equal(await packageTrigger.evaluate((element) => element === document.activeElement), true);
  }
  await page.setViewportSize({ width: 375, height: 812 });
  await navigate("/id/products");

  const trigger = page.getByRole("button", { name: "Buka menu cepat", exact: true });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await dialog.waitFor();
  const search = dialog.getByRole("combobox");
  assert.equal(await dialog.locator("[data-slot='command-input-wrapper']").evaluate((element) => getComputedStyle(element).boxShadow.includes("rgb(89, 185, 255)")), true, "Search has a visible focus indicator");
  await search.fill("zzz-unavailable");
  await dialog.getByText("Halaman tidak ditemukan. Coba kata lain.").waitFor();
  await search.fill("traffic-tracker");
  await dialog.getByRole("option", { name: "Packages" }).waitFor();
  await search.fill("Digitool");
  await page.keyboard.press("ArrowDown");
  assert.match(await search.getAttribute("aria-activedescendant"), /.+/);
  await page.keyboard.press("Enter");
  await page.waitForURL("**/id/digitool");
  await page.waitForFunction(() => [...document.querySelectorAll('astro-island[client="load"]')].every((island) => !island.hasAttribute("ssr")));
  assert.equal(await page.locator("header a[aria-current='page']").textContent().then((s) => s.trim()), "Produk");

  await page.keyboard.press("Control+k");
  await page.getByRole("dialog").waitFor();
  assert.equal(await search.evaluate((element) => element === document.activeElement), true);
  const initialSelected = await search.getAttribute("aria-activedescendant");
  await page.keyboard.press("ArrowDown");
  assert.notEqual(await search.getAttribute("aria-activedescendant"), initialSelected);
  await page.keyboard.press("ArrowUp");
  assert.equal(await search.getAttribute("aria-activedescendant"), initialSelected);
  await page.keyboard.press("Shift+Tab");
  assert.equal(await dialog.evaluate((element) => element.contains(document.activeElement)), true, "Focus remains in dialog");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "detached" });
  assert.equal(await trigger.evaluate((element) => element === document.activeElement), true, "Focus returns to trigger");
  await page.keyboard.press("Meta+k");
  await dialog.waitFor();
  await dialog.getByRole("button", { name: /Tutup/ }).click();
  await dialog.waitFor({ state: "detached" });
  assert.equal(await trigger.evaluate((element) => element === document.activeElement), true);

  await navigate("/id");
  const launcher = page.getByRole("button", { name: "Buka menu cepat", exact: true }).last();
  await launcher.click();
  await dialog.waitFor();
  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "detached" });
  assert.equal(await launcher.evaluate((element) => element === document.activeElement), true);

  await navigate("/id/contact");
  await page.evaluate(() => Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async () => { throw new Error("Clipboard denied"); } } }));
  await page.getByRole("button", { name: "Salin email" }).click();
  await page.getByRole("status").getByText("Email belum dapat disalin. Salin secara manual: hello@rcd.my.id").waitFor();
  await page.evaluate(() => Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async (value) => { if (value !== "hello@rcd.my.id") throw new Error("Incorrect email"); } } }));
  await page.getByRole("button", { name: "Salin email" }).click();
  await page.getByRole("status").getByText("Email disalin.", { exact: true }).waitFor();

  await page.emulateMedia({ reducedMotion: "reduce" });
  await navigate("/id/career-mate");
  assert.equal(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches), true);
  assert.equal(await page.locator("figcaption").textContent().then((s) => s.trim()), "Ilustrasi fitur · Bukan screenshot aplikasi");
  await trigger.click();
  await dialog.waitFor();
  assert(await dialog.evaluate((element) => element.getBoundingClientRect().right <= innerWidth));
  await page.screenshot({ path: join(output, "command-375.png") });
  await page.keyboard.press("Escape");
  for (const viewport of [{ width: 320, height: 568 }, { width: 812, height: 375 }]) {
    await page.setViewportSize(viewport);
    await trigger.click();
    await dialog.waitFor();
    const closeBounds = await dialog.getByRole("button", { name: /Tutup/ }).boundingBox();
    assert(closeBounds.y >= 0 && closeBounds.y + closeBounds.height <= viewport.height, "Dialog close stays visible");
    assert(await dialog.evaluate((element) => element.getBoundingClientRect().right <= innerWidth));
    await page.screenshot({ path: join(output, "command-" + viewport.width + "x" + viewport.height + ".png") });
    await page.keyboard.press("Escape");
  }

  const localLinks = new Set();
  for (const route of routes) {
    await navigate("/id" + route);
    for (const href of await page.locator("a[href]").evaluateAll((links) => links.map((link) => link.href))) {
      const url = new URL(href);
      if (url.origin === origin) localLinks.add(url.pathname);
    }
  }
  for (const path of localLinks) assert.equal((await context.request.get(origin + path)).status(), 200, "Broken link: " + path);
  assert.equal(new URL((await context.request.get(origin + "/")).url()).pathname, "/id");
  assert.deepEqual(apiRequests, [], "Public presentation should not introduce API calls");
  assert.deepEqual(errors, [], "Browser runtime errors");
  console.log(JSON.stringify({ responsiveChecks, publicRoutes: routes.length * 2, internalLinks: localLinks.size, browserErrors: errors, apiRequests, screenshots: output }, null, 2));
} finally {
  await browser.close();
}
