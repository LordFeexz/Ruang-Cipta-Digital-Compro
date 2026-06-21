<script lang="ts">
  import Globe from "@lucide/svelte/icons/globe";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { Button } from "$lib/components/ui/button";

  export let currentLang: string = "id";

  // URL rewrite helper for client
  const switchLang = (targetLang: string) => {
    if (typeof window === "undefined") return "#";
    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);
    
    // Replace the first segment (language code)
    if (segments.length > 0 && ['id', 'en'].includes(segments[0])) {
      segments[0] = targetLang;
    } else {
      segments.unshift(targetLang);
    }
    
    return `/${segments.join('/')}${window.location.search}${window.location.hash}`;
  };
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props} variant="ghost" size="icon" class="h-9 w-9 rounded-full relative overflow-hidden group">
        <div class="absolute inset-0 bg-brand-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <Globe class="h-4 w-4" />
        <span class="sr-only">Toggle language</span>
      </Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content align="end" class="w-32 bg-background/95 backdrop-blur-md border-white/10 shadow-xl">
    <DropdownMenu.Label class="text-xs text-muted-foreground uppercase tracking-wider">Language</DropdownMenu.Label>
    <DropdownMenu.Separator class="bg-white/10" />
    <DropdownMenu.Item>
      {#snippet child({ props })}
        <a href={switchLang('id')} {...props} class="cursor-pointer w-full flex items-center {currentLang === 'id' ? 'font-bold text-brand-primary' : ''}">
          <span class="mr-2 text-lg">🇮🇩</span> Indonesia
        </a>
      {/snippet}
    </DropdownMenu.Item>
    <DropdownMenu.Item>
      {#snippet child({ props })}
        <a href={switchLang('en')} {...props} class="cursor-pointer w-full flex items-center {currentLang === 'en' ? 'font-bold text-brand-primary' : ''}">
          <span class="mr-2 text-lg">🇬🇧</span> English
        </a>
      {/snippet}
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
