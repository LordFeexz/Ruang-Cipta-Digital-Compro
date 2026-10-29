<script lang="ts">
  import Terminal from "@lucide/svelte/icons/terminal";
  import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
  import { Button } from "$lib/components/ui/button";
  import { Card } from "$lib/components/ui/card";
  import { Badge } from "$lib/components/ui/badge";
  import * as Dialog from "$lib/components/ui/dialog";
  import type { PublicPackage } from "./content";

  let { item, compact = false }: { item: PublicPackage; compact?: boolean } = $props();
  let heading = $state<HTMLElement | null>(null);
</script>

<Dialog.Root>
  <Card class={compact
    ? "gap-0 rounded-md border-0 bg-transparent px-0 py-7 shadow-none ring-0 sm:px-3"
    : "gap-0 rounded-xl border border-border bg-card p-6 shadow-none ring-0 sm:p-8"}>
    <div class="flex min-w-0 items-start gap-4">
      <div class="mt-1 flex size-12 shrink-0 items-center justify-center rounded-xl border border-border bg-brand-soft text-brand-quiet">
        <Terminal class="size-5" aria-hidden="true" />
      </div>
      <div class="min-w-0 flex-1">
        <p class="text-[10px] tracking-widest text-muted-foreground uppercase">npm package</p>
        <h2 class="mt-2 text-lg font-semibold [overflow-wrap:anywhere]">{item.name}</h2>
        <p class="mt-2 text-base leading-relaxed text-muted-foreground">{item.description}</p>
        <div class="mt-4 flex flex-wrap gap-2">
          {#each item.tags as tag}<Badge variant="secondary" class="h-auto rounded-sm px-2 py-1 text-[11px] font-normal whitespace-normal">{tag}</Badge>{/each}
        </div>
        <Dialog.Trigger>
          {#snippet child({ props })}
            <Button {...props} variant={compact ? "ghost" : "outline"}
              class={"mt-5 h-auto min-h-11 max-w-full gap-2 py-2 whitespace-normal " + (compact ? "px-0 text-brand-quiet hover:bg-transparent" : "px-4")}
              aria-label={"Lihat detail " + item.name}>
              Lihat detail package <span aria-hidden="true">→</span>
            </Button>
          {/snippet}
        </Dialog.Trigger>
      </div>
    </div>
  </Card>

  <Dialog.Content class="rcd-public max-h-[85svh] gap-5 overflow-y-auto border border-border bg-popover text-foreground shadow-none sm:max-w-xl"
    onOpenAutoFocus={(event) => { event.preventDefault(); heading?.focus({ preventScroll: true }); }}>
    <div class="pr-10">
      <p class="mb-3 text-[10px] tracking-widest text-muted-foreground uppercase">Packages / Developer tools</p>
      <Dialog.Title bind:ref={heading} tabindex={-1} class="text-2xl font-semibold tracking-tight [overflow-wrap:anywhere]">{item.name}</Dialog.Title>
    </div>
    <Dialog.Description class="text-base leading-relaxed text-muted-foreground">{item.description}</Dialog.Description>
    <div>
      <h3 class="mb-3 text-sm font-medium">Instalasi</h3>
      <pre class="overflow-x-auto rounded-md border border-border bg-background p-4 text-sm text-brand-quiet"><code>{item.installCommand}</code></pre>
    </div>
    <div class="grid gap-5 sm:grid-cols-2">
      {#each item.features as feature}
        <section class="border-t border-border pt-4">
          <h3 class="text-base font-medium">{feature.title}</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
        </section>
      {/each}
    </div>
    <nav aria-label={"Dokumentasi " + item.name} class="flex flex-wrap gap-3 border-t border-border pt-5">
      <Button href={item.npmUrl} target="_blank" rel="noopener noreferrer" class="min-h-11 gap-2 px-4">
        Lihat di npm <ArrowUpRight class="size-4" aria-hidden="true" /><span class="sr-only"> (tab baru)</span>
      </Button>
      <Button href={item.repositoryUrl} target="_blank" rel="noopener noreferrer" variant="outline" class="min-h-11 gap-2 px-4">
        Repository <ArrowUpRight class="size-4" aria-hidden="true" /><span class="sr-only"> (tab baru)</span>
      </Button>
    </nav>
  </Dialog.Content>
</Dialog.Root>
