<script lang="ts">
  import Menu from "@lucide/svelte/icons/menu";
  import X from "@lucide/svelte/icons/x";
  import ChevronRight from "@lucide/svelte/icons/chevron-right";
  import { Button } from "$lib/components/ui/button";
  import type { NavContent } from '../../../content/types';
  import LanguageSwitcher from './LanguageSwitcher.svelte';

  export let lang: string = "id";
  export let navItems: NavContent;

  let isOpen = false;

  const toggleMenu = () => {
    isOpen = !isOpen;
    if (typeof document !== 'undefined') {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  };
</script>

<Button variant="ghost" size="icon" onclick={toggleMenu} class="md:hidden">
  <Menu class="h-6 w-6" />
</Button>

{#if isOpen}
  <div class="fixed inset-0 z-50 bg-background/98 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
    <div class="container mx-auto px-4 py-4 flex flex-col h-full">
      <div class="flex justify-between items-center mb-8">
        <a href={`/${lang}`} onclick={toggleMenu} class="flex items-center gap-2">
          <img src="/logo.png" alt="Ruang Cipta Digital" class="h-8 w-auto" />
          <span class="font-bold text-lg hidden sm:block tracking-tight">Ruang Cipta Digital</span>
        </a>
        <Button variant="ghost" size="icon" onclick={toggleMenu} class="rounded-full bg-white/5 hover:bg-white/10">
          <X class="h-6 w-6" />
        </Button>
      </div>

      <nav class="grow flex flex-col justify-center space-y-6 text-2xl font-semibold tracking-tight">
        <a href={`/${lang}/career-mate`} onclick={toggleMenu} class="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors">
          <span>{navItems.careerMate}</span>
          <ChevronRight class="h-6 w-6 text-muted-foreground" />
        </a>
        <a href={`/${lang}/digitool`} onclick={toggleMenu} class="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors">
          <span>{navItems.digiTool}</span>
          <ChevronRight class="h-6 w-6 text-muted-foreground" />
        </a>
      </nav>

      <div class="mt-auto py-8 border-t border-white/10 flex items-center justify-between">
        <LanguageSwitcher currentLang={lang} />
        <Button href={`mailto:${import.meta.env.PUBLIC_CONTACT_EMAIL}`} onclick={toggleMenu} class="rounded-full bg-brand-gradient hover:opacity-90 text-white shadow-lg shadow-brand-primary/20">
          {navItems.contact}
        </Button>
      </div>
    </div>
  </div>
{/if}
