<script lang="ts">
  import type { TimelineStep } from "../../../content/types";
  import { onMount } from "svelte";

  export let steps: TimelineStep[];
  export let title: string;
  export let stepLabel: string = "Step";
  export let eyebrow: string | undefined = undefined;

  let containerNode: HTMLElement;
  let activeIndex = -1;
  // SSR/no-JS guard: until the island hydrates, every step renders fully
  // visible — the dimmed "not yet reached" state is a JS-only enhancement,
  // mirroring the html:not([data-aos-ready]) rule in global.css.
  let hydrated = false;

  onMount(() => {
    hydrated = true;
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

<div class="mx-auto max-w-3xl" bind:this={containerNode}>
  <div class="mb-14 flex flex-col items-center text-center">
    {#if eyebrow}
      <span class="eyebrow mb-4 flex items-center gap-2.5">
        <span class="circuit-node" aria-hidden="true"></span>
        {eyebrow}
      </span>
    {/if}
    <h2 class="font-display text-title text-foreground">{title}</h2>
  </div>

  <ol class="relative">
    <!-- Track -->
    <div
      class="bg-border absolute top-3 bottom-3 left-[7px] w-px"
      aria-hidden="true"
    ></div>

    <!-- Progress -->
    <div
      class="bg-brand absolute top-3 left-[7px] w-px transition-all duration-500 ease-out"
      style={`height: ${activeIndex >= 0 ? ((activeIndex + 1) / steps.length) * 100 : 0}%;`}
      aria-hidden="true"
    ></div>

    {#each steps as step, index}
      <li
        class="timeline-item relative mb-4 pl-10 last:mb-0 sm:mb-5 sm:pl-14"
        data-index={index}
      >
        <!-- Square circuit-node marker -->
        <div
          class="absolute top-8 left-[7px] z-10 size-3.5 -translate-x-1/2 rounded-[2px] border-2 transition-colors duration-300 {index <=
          activeIndex
            ? 'border-brand bg-brand'
            : 'border-border bg-background'}"
          aria-hidden="true"
        ></div>

        <div
          class="bg-card border-border rounded-2xl border p-6 transition-all duration-500 sm:p-8 {!hydrated ||
          index <= activeIndex
            ? 'translate-y-0 opacity-100'
            : 'translate-y-3 opacity-50'}"
        >
          <div class="flex flex-col gap-4 sm:flex-row sm:gap-8">
            <span
              class="font-display text-figure text-brand shrink-0"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <span class="sr-only">{stepLabel} {index + 1}</span>
              <h3 class="text-heading text-foreground mb-2">
                {step.title}
              </h3>
              <p
                class="text-muted-foreground text-sm leading-relaxed sm:text-base"
              >
                {step.description}
              </p>
            </div>
          </div>
        </div>
      </li>
    {/each}
  </ol>
</div>
