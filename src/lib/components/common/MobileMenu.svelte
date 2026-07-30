<script lang="ts">
  import Menu from "@lucide/svelte/icons/menu";
  import X from "@lucide/svelte/icons/x";
  import ChevronRight from "@lucide/svelte/icons/chevron-right";
  import { Button } from "$lib/components/ui/button";
  import type { NavContent } from "../../../content/types";
  import LanguageSwitcher from "./LanguageSwitcher.svelte";
  import logoImg from "../../../assets/logo.png";

  export let lang: string = "id";
  export let navItems: NavContent;

  let isOpen = false;
  let panel: HTMLElement | undefined;

  const setBodyScroll = (locked: boolean) => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = locked ? "hidden" : "";
  };

  const toggleMenu = () => {
    isOpen = !isOpen;
    setBodyScroll(isOpen);
  };

  const close = () => {
    isOpen = false;
    setBodyScroll(false);
  };

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && isOpen) close();
  };

  const links = [
    { href: `/${lang}/career-mate`, key: "careerMate" as const },
    { href: `/${lang}/digitool`, key: "digiTool" as const },
  ];
</script>

<svelte:window on:keydown={onKeydown} />

<Button
  variant="ghost"
  onclick={toggleMenu}
  aria-label={navItems.openMenu}
  aria-expanded={isOpen}
  class="text-muted-foreground hover:text-foreground hover:bg-accent grid size-11 place-items-center rounded-full md:hidden"
>
  <Menu class="size-5" aria-hidden="true" />
</Button>

{#if isOpen}
  <div
    bind:this={panel}
    role="dialog"
    aria-modal="true"
    aria-label={navItems.products}
    class="bg-background animate-in fade-in fixed inset-0 z-50 duration-200"
  >
    <div class="container mx-auto flex h-full flex-col px-4 py-4">
      <div class="flex h-16 items-center justify-between">
        <a href={`/${lang}`} onclick={close} class="flex items-center gap-3">
          <img src={logoImg.src} alt="" width="32" height="32" class="h-8 w-auto" />
          <span class="text-base font-medium tracking-tight">
            Ruang Cipta Digital
          </span>
        </a>
        <Button
          variant="ghost"
          onclick={close}
          aria-label={navItems.closeMenu}
          class="text-muted-foreground hover:text-foreground hover:bg-accent grid size-11 place-items-center rounded-full"
        >
          <X class="size-5" aria-hidden="true" />
        </Button>
      </div>

      <nav class="mt-10 flex flex-col gap-2" aria-label={navItems.products}>
        {#each links as link (link.href)}
          <a
            href={link.href}
            onclick={close}
            class="border-border hover:bg-accent hover:border-brand-ring font-display flex items-center justify-between rounded-xl border px-5 py-5 text-2xl font-normal transition-colors"
          >
            <span>{navItems[link.key]}</span>
            <ChevronRight class="text-muted-foreground size-5" aria-hidden="true" />
          </a>
        {/each}
      </nav>

      <div
        class="border-border mt-auto flex items-center justify-between border-t py-6"
      >
        <LanguageSwitcher currentLang={lang} label={navItems.language} />
        <Button
          href={`mailto:${import.meta.env.PUBLIC_CONTACT_EMAIL}`}
          onclick={close}
          variant="brand"
          class="h-11 rounded-full px-6"
        >
          {navItems.contact}
        </Button>
      </div>
    </div>
  </div>
{/if}
