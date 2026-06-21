<script lang="ts">
  import type { MetricData } from "../../../content/types";
  import CountUp from "./CountUp.svelte";

  export let metrics: MetricData[];
</script>

<div class="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto">
  {#each metrics as metric, i}
    <div 
      class="flex flex-col items-center justify-center p-6 bg-card border border-white/5 rounded-2xl shadow-lg"
      data-aos="fade-up"
      data-aos-delay={i * 100}
    >
      <div class="text-3xl sm:text-4xl font-bold tracking-tighter text-gradient mb-2 flex items-baseline">
        {#if metric.prefix}<span>{metric.prefix}</span>{/if}
        <CountUp value={metric.value} />
        {#if metric.suffix}<span>{metric.suffix}</span>{/if}
      </div>
      <div class="text-sm text-muted-foreground text-center font-medium">
        {metric.label}
      </div>
    </div>
  {/each}
</div>
