<script lang="ts">
  import type { TimelineStep } from "../../../content/types";
  import { onMount } from "svelte";

  export let steps: TimelineStep[];
  export let title: string;
  export let stepLabel: string = "Step";
  export let eyebrow: string | undefined = undefined;

  let containerNode: HTMLElement;
  let activeIndex = -1;

  onMount(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // With reduced motion the scroll-driven reveal is pointless — show everything.
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      activeIndex = steps.length - 1;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (index > activeIndex) {
              activeIndex = index;
            }
          }
        });
      },
      { threshold: 0.5, rootMargin: "-10% 0px -40% 0px" },
    );

    const items = containerNode.querySelectorAll(".timeline-item");
    items.forEach((item) => observer.observe(item));

    return () => {
      items.forEach((item) => observer.unobserve(item));
    };
  });
</script>

<div class="mx-auto max-w-4xl" bind:this={containerNode}>
  <div class="mb-16 flex flex-col items-center text-center">
    {#if eyebrow}
      <span class="eyebrow mb-4 flex items-center gap-3">
        <span class="bg-brand/60 h-px w-6" aria-hidden="true"></span>
        {eyebrow}
      </span>
    {/if}
    <h2 class="font-display text-title text-foreground font-normal">{title}</h2>
  </div>

  <ol class="relative pl-8 sm:pl-0">
    <!-- Track -->
    <div
      class="bg-border absolute top-0 bottom-0 left-8 w-px -translate-x-1/2 sm:left-1/2"
      aria-hidden="true"
    ></div>

    <!-- Progress -->
    <div
      class="bg-brand absolute top-0 left-8 w-px -translate-x-1/2 rounded-full transition-all duration-500 ease-out sm:left-1/2"
      style={`height: ${activeIndex >= 0 ? ((activeIndex + 1) / steps.length) * 100 : 0}%;`}
      aria-hidden="true"
    ></div>

    {#each steps as step, index}
      <li
        class="timeline-item relative mb-12 flex w-full flex-col items-start last:mb-0 sm:flex-row sm:items-center"
        data-index={index}
      >
        <!-- Node -->
        <div
          class="bg-background absolute left-8 z-10 grid size-3.5 -translate-x-1/2 place-items-center rounded-full border-2 transition-colors duration-300 sm:left-1/2 {index <=
          activeIndex
            ? 'border-brand'
            : 'border-border'}"
          aria-hidden="true"
        ></div>

        <!-- Content, alternating sides on desktop -->
        <div
          class="w-full pl-12 sm:w-1/2 sm:pl-0 {index % 2 === 0
            ? 'sm:pr-14 sm:text-right'
            : 'sm:ml-auto sm:pl-14'}"
        >
          <div
            class="border-border bg-card rounded-2xl border p-6 transition-all duration-500 {index <=
            activeIndex
              ? 'translate-y-0 opacity-100'
              : 'translate-y-3 opacity-50'}"
          >
            <span class="eyebrow text-brand-quiet mb-3 block">
              {stepLabel}
              {index + 1}
            </span>
            <h3 class="text-heading text-foreground mb-3 font-medium">
              {step.title}
            </h3>
            <p class="text-muted-foreground text-sm leading-relaxed sm:text-base">
              {step.description}
            </p>
          </div>
        </div>
      </li>
    {/each}
  </ol>
</div>
