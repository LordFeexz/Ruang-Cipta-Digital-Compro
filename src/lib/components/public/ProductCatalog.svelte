<script lang="ts">
  import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
  import PackageOpen from "@lucide/svelte/icons/package-open";
  import { Button } from "$lib/components/ui/button";
  import { Separator } from "$lib/components/ui/separator";
  import { publicPackages, type PublicProduct } from "./content";
  import PackageEntry from "./PackageEntry.svelte";
  let { products }: { products: PublicProduct[] } = $props();
  let filter = $state("all");
  const filters = [
    { value: "all", label: "Semua karya" },
    { value: "app", label: "Aplikasi" },
    { value: "package", label: "Packages" },
    { value: "experiment", label: "Eksperimen" },
  ];
  // Filtering remains presentation state, with no fetch or persistence.
  let visible = $derived(filter === "all" || filter === "app" ? products : []);
  let visiblePackages = $derived(filter === "all" || filter === "package" ? publicPackages : []);
</script>
<div class="mt-8 flex flex-wrap gap-2" role="group" aria-label="Kategori karya">
  {#each filters as item}
    <Button variant={filter === item.value ? "secondary" : "outline"} aria-pressed={filter === item.value}
      class={"min-h-11 rounded-full border px-4 text-xs " + (filter === item.value ? "border-brand-ring bg-brand-soft text-brand-quiet" : "border-border text-muted-foreground")}
      onclick={() => filter = item.value}>{item.label}</Button>
  {/each}
</div>
<p class="sr-only" role="status" aria-live="polite" aria-atomic="true">{filters.find((item) => item.value === filter)?.label}: {visible.length + visiblePackages.length} karya ditampilkan.</p>
<div class="mt-4">
  {#each visible as product}
    <a href={product.href} class="group flex min-w-0 items-start gap-4 rounded-md py-7 transition-colors hover:bg-card sm:items-center sm:px-3">
      <div class="mt-1 flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-card sm:mt-0">
        <img src={product.logo} alt={"Logo " + product.name} width="64" height="64" class={"size-full object-contain " + (product.slug === "digitool" ? "p-1.5" : "")} />
      </div>
      <div class="min-w-0 flex-1">
        <span class="text-[10px] tracking-widest text-muted-foreground uppercase">Aplikasi web</span>
        <h2 class="mt-2 text-lg font-semibold">{product.name}</h2>
        <p class="mt-2 text-base leading-relaxed text-muted-foreground">{product.description} {product.valueProp}</p>
        <span class="mt-3 inline-flex min-h-8 items-center gap-2 text-xs text-brand-quiet">Kenali {product.name}<span aria-hidden="true">→</span></span>
      </div>
      <ArrowUpRight class="mt-2 size-4 shrink-0 text-brand-quiet" aria-hidden="true" />
    </a>
    <Separator />
  {/each}
  {#each visiblePackages as item}
    <PackageEntry {item} compact />
    <Separator />
  {/each}
  {#if visible.length + visiblePackages.length === 0}
    <div class="rounded-xl border border-border bg-card px-5 py-10 sm:px-8">
      <PackageOpen class="mb-5 size-7 text-brand-quiet" aria-hidden="true" />
      <h2 class="text-lg font-medium">Ruang untuk eksplorasi berikutnya.</h2>
      <p class="mt-3 max-w-lg text-base leading-relaxed text-muted-foreground">
        {filter === "package" ? "Belum ada package yang tersedia untuk ditampilkan." : filter === "experiment" ? "Belum ada eksperimen yang ditampilkan di sini." : "Belum ada karya yang tersedia untuk ditampilkan."}
      </p>
      {#if filter !== "all"}<Button variant="outline" class="mt-6 min-h-11 px-4" onclick={() => filter = "all"}>Lihat semua karya</Button>{/if}
    </div>
  {/if}
</div>
