<script lang="ts">
  import type { TransactionFinishContent } from "../../../content/types";
  import StatusIcon from "./StatusIcon.svelte";
  import CSSConfetti from "./CSSConfetti.svelte";
  import { Button } from "$lib/components/ui/button";
  import { Card } from "$lib/components/ui/card";
  import { Separator } from "$lib/components/ui/separator";
  import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";

  export let content: TransactionFinishContent;

  const careerMateLink =
    import.meta.env.PUBLIC_CAREER_MATE_URL || "https://apply-mate.site";
  const digitoolLink = import.meta.env.PUBLIC_DIGITOOL_URL || "https://dgtool.my.id";
</script>

<section class="relative mx-auto max-w-[780px] px-6 pt-10 pb-16 sm:pt-16 sm:pb-24" aria-labelledby="transaction-title">
  <CSSConfetti active={true} />
  <p class="mb-5 text-[10px] font-medium leading-relaxed tracking-[0.15em] text-muted-foreground uppercase">Ruang Cipta Digital / Transaksi</p>
  <Card class="relative gap-0 rounded-xl border border-border bg-linear-to-br from-primary/5 to-card p-6 shadow-none ring-0 sm:p-10">
    <StatusIcon state="success" />
    <h1 id="transaction-title" class="mt-6 text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl">
      {content.title.success}
    </h1>
    <p class="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
      {content.description.success}
    </p>
    <Separator class="my-8 bg-border" />
    <p class="mb-4 text-xs font-medium tracking-widest text-muted-foreground uppercase">{content.orderInfo.product}</p>
    <nav aria-label={content.orderInfo.product} class="grid gap-3 sm:grid-cols-2">
      <Button href={careerMateLink} variant="brand" class="h-auto gap-2 px-4 py-3 whitespace-normal">
        {content.productCta.careerMate}
        <ArrowUpRight class="size-4" aria-hidden="true" />
      </Button>
      <Button href={digitoolLink} variant="brandGhost" class="h-auto gap-2 px-4 py-3 whitespace-normal">
        {content.productCta.digitool}
        <ArrowUpRight class="size-4" aria-hidden="true" />
      </Button>
    </nav>
  </Card>
</section>
