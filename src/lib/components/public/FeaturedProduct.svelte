<script lang="ts">
  import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import { Card } from "$lib/components/ui/card";
  import { Badge } from "$lib/components/ui/badge";
  import { Separator } from "$lib/components/ui/separator";
  import type { PublicProduct } from "./content";
  let { product }: { product: PublicProduct } = $props();
</script>
<a href={product.href} class="group block min-w-0 rounded-xl" aria-label={"Kenali " + product.name}>
  <Card class="h-full gap-0 rounded-xl border border-border bg-linear-to-br from-primary/10 to-card p-6 shadow-none ring-0 transition-colors duration-200 group-hover:border-brand-ring sm:p-7">
    <div class="flex items-center gap-3">
      <div class="flex size-[52px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-background">
        <img src={product.logo} alt={"Logo " + product.name} width="64" height="64" class={"size-full object-contain " + (product.slug === "digitool" ? "p-1.5" : "")} />
      </div>
      <span class="text-[9px] tracking-[0.12em] text-muted-foreground">{product.kind}</span>
      <ArrowUpRight class="ml-auto size-4 shrink-0 text-brand-quiet" aria-hidden="true" />
    </div>
    <h3 class="mt-6 text-[27px] leading-tight font-semibold tracking-tight">{product.name}</h3>
    <p class="mt-3 text-base leading-relaxed text-muted-foreground">{product.description} {product.valueProp}</p>
    <div class="mt-5 flex flex-wrap gap-2">
      {#each product.tags as tag}<Badge variant="secondary" class="h-auto rounded-sm px-2 py-1 text-[11px] font-normal whitespace-normal">{tag}</Badge>{/each}
    </div>
    <div class="mt-5 flex h-[145px] items-center justify-center bg-radial from-primary/10 to-transparent" aria-hidden="true">
      <img src={product.mascot} alt="" width="400" height="460" loading="lazy" class="h-[152px] w-auto max-w-full object-contain motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-1" />
    </div>
    <div class="mt-auto pt-6">
      <Separator class="bg-border" />
      <div class="flex min-h-11 items-center justify-between gap-3 pt-3 text-sm text-brand-quiet">
        Kenali {product.name}<ArrowRight class="size-4" aria-hidden="true" />
      </div>
    </div>
  </Card>
</a>
