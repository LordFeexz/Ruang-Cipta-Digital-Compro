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

<div
  class="mx-auto grid {measure} {columns} {variant === 'card'
    ? 'gap-4 sm:gap-6'
    : 'gap-6 sm:gap-8'}"
>
  {#each metrics as metric, i}
    <!-- Deliberately no `data-aos` here. AOS sets opacity:0 via its stylesheet
         and adds `aos-animate` to un-hide; when Svelte hydrates this island it
         reconciles the class attribute against its own template and drops that
         class, leaving the metrics permanently invisible. CountUp's own
         IntersectionObserver is the reveal for this component. -->
    <div
      class="flex flex-col items-center justify-center text-center {variant ===
      'card'
        ? 'border-border bg-card rounded-2xl border p-6'
        : ''}"
    >
      <div
        class="text-foreground flex items-baseline text-2xl font-medium tracking-tight tabular-nums sm:text-3xl"
      >
        {#if metric.prefix}<span>{metric.prefix}</span>{/if}
        <CountUp value={metric.value} />
        {#if metric.suffix}<span class="text-brand">{metric.suffix}</span>{/if}
      </div>
      <div class="text-muted-foreground mt-2 text-sm">
        {metric.label}
      </div>
    </div>
  {/each}
</div>
