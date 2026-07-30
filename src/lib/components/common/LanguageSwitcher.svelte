<script lang="ts">
  import Globe from "@lucide/svelte/icons/globe";
  import Check from "@lucide/svelte/icons/check";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { Button } from "$lib/components/ui/button";

  export let currentLang: string = "id";
  export let label: string = "Language";

  const options = [
    { code: "id", name: "Indonesia" },
    { code: "en", name: "English" },
  ];

  // URL rewrite helper for client
  const switchLang = (targetLang: string) => {
    if (typeof window === "undefined") return "#";
    const path = window.location.pathname;
    const segments = path.split("/").filter(Boolean);

    // Replace the first segment (language code)
    if (segments.length > 0 && ["id", "en"].includes(segments[0])) {
      segments[0] = targetLang;
    } else {
      segments.unshift(targetLang);
    }

    return `/${segments.join("/")}${window.location.search}${window.location.hash}`;
  };
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button
        {...props}
        variant="ghost"
        class="text-muted-foreground hover:text-foreground hover:bg-accent grid size-11 place-items-center rounded-full md:size-9"
      >
        <Globe class="size-[1.05rem]" aria-hidden="true" />
        <span class="sr-only">{label}</span>
      </Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content
    align="end"
    class="bg-popover border-border w-40 backdrop-blur-xl"
  >
    <DropdownMenu.Label
      class="text-eyebrow text-muted-foreground uppercase"
    >
      {label}
    </DropdownMenu.Label>
    <DropdownMenu.Separator class="bg-border" />
    {#each options as option (option.code)}
      <DropdownMenu.Item>
        {#snippet child({ props })}
          <a
            href={switchLang(option.code)}
            {...props}
            hreflang={option.code}
            aria-current={currentLang === option.code ? "true" : undefined}
            class="flex w-full cursor-pointer items-center justify-between gap-2 {currentLang ===
            option.code
              ? 'text-foreground font-medium'
              : 'text-muted-foreground'}"
          >
            {option.name}
            {#if currentLang === option.code}
              <Check class="text-brand size-4" aria-hidden="true" />
            {/if}
          </a>
        {/snippet}
      </DropdownMenu.Item>
    {/each}
  </DropdownMenu.Content>
</DropdownMenu.Root>
