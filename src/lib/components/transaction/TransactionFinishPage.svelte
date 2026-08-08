<script lang="ts">
  import type { TransactionFinishContent } from "../../../content/types";
  import StatusIcon from "./StatusIcon.svelte";
  import CSSConfetti from "./CSSConfetti.svelte";
  import { Button } from "$lib/components/ui/button";

  export let content: TransactionFinishContent;

  const careerMateLink =
    import.meta.env.PUBLIC_CAREER_MATE_URL || "https://apply-mate.site";
  const digitoolLink = import.meta.env.PUBLIC_DIGITOOL_URL || "https://dgtool.my.id";
  const iorionLink =
    import.meta.env.PUBLIC_IORION_APP_URL || "https://iorion.my.id";
</script>

<div
  class="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-4 py-20"
>
  <!-- Flat engineering-paper backdrop — the one decoration this page band gets. -->
  <div
    class="blueprint-grid blueprint-fade pointer-events-none absolute inset-0"
    aria-hidden="true"
  ></div>

  <CSSConfetti active={true} />

  <!-- No `data-aos` in this component: it renders with `client:only`, so the
       nodes do not exist when AOS.init() runs, yet aos.css would still apply
       opacity:0 to them. StatusIcon's stroke-draw is the reveal here. -->
  <div
    class="flat-card relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center px-6 py-12 text-center sm:px-12 sm:py-16"
  >
    <StatusIcon state="success" />

    <h1 class="font-display text-title text-foreground mt-8">
      {content.title.success}
    </h1>

    <p class="text-lede text-muted-foreground mt-5 max-w-lg">
      {content.description.success}
    </p>

    <!-- Product CTAs -->
    <div
      class="border-border mt-12 flex w-full flex-col justify-center gap-3 border-t pt-8 sm:flex-row sm:gap-4"
    >
      <Button href={careerMateLink} variant="brand" size="xl" class="flex-1">
        {content.productCta.careerMate}
      </Button>
      <Button
        href={digitoolLink}
        variant="brandGhost"
        size="xl"
        class="flex-1"
      >
        {content.productCta.digitool}
      </Button>
      <Button href={iorionLink} variant="brand" size="xl" class="flex-1">
        {content.productCta.iorion}
      </Button>
    </div>
  </div>
</div>
