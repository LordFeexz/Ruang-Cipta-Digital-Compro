<script lang="ts">
  import { onMount } from "svelte";
  import CommandIcon from "@lucide/svelte/icons/command";
  import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
  import { Button } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import * as Command from "$lib/components/ui/command";
  import { publicDestinations } from "./content";
  import { getLocalizedPath } from "../../i18n";

  let { lang, currentPath }: { lang: string; currentPath: string } = $props();
  let open = $state(false);
  let search = $state("");
  let returnFocus: HTMLElement | null = null;
  let trigger = $state<HTMLButtonElement | null>(null);
  const links = [
    { label: "Produk", path: "products" },
    { label: "Packages", path: "packages" },
    { label: "Tentang", path: "about" },
    { label: "Kontak", path: "contact" },
  ];
  const activePath = (path: string) => currentPath.replace(/\/$/, "") === getLocalizedPath(lang, path)
    || (path === "products" && /\/(career-mate|digitool)\/?$/.test(currentPath));
  const destinations = $derived(publicDestinations(lang));
  const alternateLang = $derived(lang === "id" ? "en" : "id");
  const alternatePath = $derived(currentPath.replace(/^\/(id|en)(?=\/|$)/, "/" + alternateLang));

  function openCommand(from: HTMLElement | null = null) {
    // Avoid opening a second modal over another functional dialog.
    if (!open && document.querySelector('[role="dialog"][data-state="open"]')) return;
    returnFocus = from ?? trigger;
    search = "";
    open = !open;
  }
  function onKeydown(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openCommand(trigger);
    }
  }
  onMount(() => {
    const launch = () => openCommand(document.activeElement instanceof HTMLElement ? document.activeElement : undefined);
    document.addEventListener("rcd:open-command", launch);
    return () => document.removeEventListener("rcd:open-command", launch);
  });
  function visit(href: string) {
    open = false;
    window.location.assign(href);
  }
</script>

<svelte:window onkeydown={onKeydown} />

<header class="px-6 sm:px-10">
  <div class="relative mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-x-4 pt-5 sm:min-h-[90px] sm:flex-nowrap sm:pt-0">
    <a href={getLocalizedPath(lang)} aria-label="Ruang Cipta Digital — beranda" class="flex min-h-11 items-center gap-2.5 rounded-md">
      <img src="/brand/rcd-logo.png" width="38" height="38" alt="" class="size-[38px] object-contain" />
      <span class="text-[28px] font-extrabold tracking-[-2px]">rcd<span class="text-brand-bright">.</span></span>
    </a>
    <nav aria-label="Navigasi utama" class="order-3 mt-3 flex w-full justify-between gap-2 border-t border-border/60 py-1 sm:order-none sm:mt-0 sm:w-auto sm:gap-5 sm:border-0 sm:py-0 lg:gap-8">
      {#each links as link}
        <a href={getLocalizedPath(lang, link.path)}
          aria-current={activePath(link.path) ? "page" : undefined}
          class="relative inline-flex min-h-11 items-center rounded-sm text-[10px] font-medium tracking-[0.1em] uppercase transition-colors hover:text-foreground sm:px-2 {activePath(link.path) ? 'text-foreground after:absolute after:bottom-1 after:left-1/2 after:size-1 after:rounded-full after:bg-brand-bright' : 'text-muted-foreground'}">
          {link.label}
        </a>
      {/each}
    </nav>
    <div class="flex items-center gap-1">
      <a href={alternatePath} hreflang={alternateLang} onclick={(event) => { event.currentTarget.href = alternatePath + window.location.search + window.location.hash; }} aria-label={"Bahasa: " + (alternateLang === "id" ? "Indonesia" : "English")} class="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-xs uppercase text-muted-foreground hover:text-foreground">{alternateLang}</a>
      <Dialog.Root bind:open onOpenChange={(value) => { if (value) { returnFocus = trigger; search = ""; } }}>
        <Dialog.Trigger>
          {#snippet child({ props })}
            <Button {...props} bind:ref={trigger} variant="ghost" size="icon" class="size-11 text-muted-foreground" aria-label="Buka menu cepat" aria-keyshortcuts="Control+k Meta+k">
              <CommandIcon class="size-5" aria-hidden="true" />
            </Button>
          {/snippet}
        </Dialog.Trigger>
        <Dialog.Content class="rcd-public flex max-h-[85svh] flex-col gap-0 overflow-hidden border border-border bg-popover p-0 text-foreground shadow-none sm:max-w-[560px]" showCloseButton={false}
          onCloseAutoFocus={(event) => { event.preventDefault(); (returnFocus ?? trigger)?.focus(); }}>
          <div class="shrink-0 px-5 pt-5">
            <Dialog.Title class="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">Jelajahi ruang</Dialog.Title>
            <Dialog.Description class="sr-only">Cari halaman publik, gunakan tombol panah untuk memilih, lalu Enter untuk membuka. Escape untuk menutup.</Dialog.Description>
          </div>
          <Command.Root loop class="h-auto min-h-0 flex-1 rounded-none! bg-transparent p-0" label="Tujuan publik">
            <Command.Input bind:value={search} placeholder="Cari halaman atau produk…" aria-label="Cari halaman atau produk" />
            <Command.List class="min-h-0 max-h-[min(45svh,360px)] p-2">
              <Command.Empty class="px-4 py-8 text-sm text-muted-foreground">Halaman tidak ditemukan. Coba kata lain.</Command.Empty>
              {#each destinations as destination}
                <Command.Item value={destination.label} keywords={destination.keywords} onSelect={() => visit(destination.href)}
                  class="min-h-12 cursor-pointer justify-between rounded-md px-4 text-muted-foreground data-selected:bg-accent data-selected:text-foreground">
                  {destination.label}<ArrowUpRight class="size-4" aria-hidden="true" />
                </Command.Item>
              {/each}
            </Command.List>
          </Command.Root>
          <div class="flex shrink-0 items-center justify-between gap-3 border-t border-border px-5 py-2">
            <span class="text-xs text-muted-foreground">↑ ↓ Pilih <span class="ml-2">↵ Buka</span></span>
            <Dialog.Close>
              {#snippet child({ props })}
                <Button {...props} variant="ghost" class="min-h-11 px-3">Tutup <kbd class="ml-2 text-xs text-muted-foreground">Esc</kbd></Button>
              {/snippet}
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  </div>
</header>
