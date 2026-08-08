<script lang="ts">
  import type { MetricData } from "../../../content/types";
  import CountUp from "./CountUp.svelte";

  export let metrics: MetricData[];
  /** `plain` drops the card chrome — used inside the hero, which already sits on a panel. */
  export let variant: "card" | "plain" = "card";

  // Column count follows the number of metrics. A fixed md:grid-cols-4 left the
  // 2- and 3-metric rows bunched into the left half of the container. Written as
  // whole static strings so the Tailwind v4 scanner can see them.
  const COLUMNS: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  };
  $: columns = COLUMNS[metrics.length] ?? "grid-cols-2 md:grid-cols-4";
  // Narrow the container too, so few metrics don't drift far apart.
  $: measure = metrics.length <= 2 ? "max-w-xl" : "max-w-4xl";
</script>

<!-- Bento stat tiles: tight gaps, flat 1px borders, big brand numerals. -->
<div
  class="mx-auto grid {measure} {columns} {variant === 'card'
    ? 'gap-3 sm:gap-4'
    : 'gap-6 sm:gap-8'}"
>
  {#each metrics as metric}
    <!-- Deliberately no `data-aos` here. AOS sets opacity:0 via its stylesheet
         and adds `aos-animate` to un-hide; when Svelte hydrates this island it
         reconciles the class attribute against its own template and drops that
         class, leaving the metrics permanently invisible. CountUp's own
         IntersectionObserver is the reveal for this component. -->
    <div
      class="flex flex-col {variant === 'card'
        ? 'flat-card items-start p-5 text-left sm:p-6'
        : 'items-center text-center'}"
    >
      <div
        class="font-display text-figure text-brand flex items-baseline tabular-nums"
      >
        {#if metric.prefix}<span>{metric.prefix}</span>{/if}
        <CountUp value={metric.value} />
        {#if metric.suffix}<span>{metric.suffix}</span>{/if}
      </div>
      <div
        class="text-eyebrow text-muted-foreground mt-3 uppercase"
      >
        {metric.label}
      </div>
    </div>
  {/each}
</div>
