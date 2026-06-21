<script lang="ts">
  import type { TimelineStep } from "../../../content/types";
  import { onMount } from "svelte";

  export let steps: TimelineStep[];
  
  let containerNode: HTMLElement;
  let activeIndex = -1;

  onMount(() => {
    if (typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const index = Number(entry.target.getAttribute('data-index'));
              if (index > activeIndex) {
                activeIndex = index;
              }
            }
          });
        },
        { threshold: 0.5, rootMargin: "-10% 0px -40% 0px" }
      );

      const items = containerNode.querySelectorAll('.timeline-item');
      items.forEach(item => observer.observe(item));

      return () => {
        items.forEach(item => observer.unobserve(item));
      };
    } else {
      // Fallback
      activeIndex = steps.length - 1;
    }
  });
</script>

<div class="py-20 max-w-4xl mx-auto" bind:this={containerNode}>
  <div class="text-center mb-20">
    <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">How It Works</h2>
  </div>

  <div class="relative pl-8 sm:pl-0">
    <!-- Vertical line -->
    <div class="absolute left-8 sm:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2"></div>
    
    <!-- Active progress line -->
    <div 
      class="absolute left-8 sm:left-1/2 top-0 w-1 bg-brand-gradient -translate-x-1/2 transition-all duration-700 ease-out rounded-full"
      style={`height: ${activeIndex >= 0 ? ((activeIndex + 1) / steps.length) * 100 : 0}%; box-shadow: 0 0 20px var(--brand-primary);`}
    ></div>

    {#each steps as step, index}
      <div 
        class="timeline-item relative flex flex-col sm:flex-row items-start sm:items-center w-full mb-16 last:mb-0"
        data-index={index}
      >
        <!-- Node -->
        <div class="absolute left-8 sm:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-background border-2 transition-all duration-500 z-10 {index <= activeIndex ? 'border-brand-primary scale-125' : 'border-white/20'}">
          <div class="w-3 h-3 rounded-full transition-all duration-500 {index <= activeIndex ? 'bg-brand-primary animate-glow-pulse' : 'bg-transparent'}"></div>
        </div>

        <!-- Content (alternating left/right on desktop) -->
        <div class="w-full sm:w-1/2 pl-12 sm:pl-0 {index % 2 === 0 ? 'sm:pr-16 sm:text-right' : 'sm:pl-16 sm:ml-auto'}">
          <div class="p-6 rounded-2xl border border-white/5 bg-card/50 backdrop-blur-sm transition-all duration-700 transform {index <= activeIndex ? 'opacity-100 translate-y-0 shadow-lg' : 'opacity-30 translate-y-8'}">
            <div class="text-brand-primary text-sm font-bold tracking-wider uppercase mb-2">Step {index + 1}</div>
            <h3 class="text-2xl font-bold mb-3">{step.title}</h3>
            <p class="text-muted-foreground text-lg leading-relaxed">{step.description}</p>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
