<script lang="ts">
  import type { TransactionState } from "../../payment/getTransactionState";

  export let state: TransactionState;
</script>

<!-- Flat filled status disc — no rings, no glows. The disc pops in, then the
     glyph stroke-draws in `brand-on` (white on light fills, dark on the
     brighter dark-theme fills). This draw is the page's reveal animation. -->
<div class="relative mb-8 flex size-24 items-center justify-center sm:size-28">
  {#if state === "success"}
    <div class="status-disc bg-success absolute inset-0 rounded-full" aria-hidden="true"></div>
    <svg
      class="text-brand-on relative size-12 sm:size-14"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        class="animate-draw-check"
        d="M22 52L42 72L78 30"
        stroke="currentColor"
        stroke-width="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  {:else if state === "pending"}
    <div class="status-disc bg-warning absolute inset-0 rounded-full" aria-hidden="true"></div>
    <svg
      class="text-brand-on relative size-12 sm:size-14"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        class="animate-spin-slow origin-center"
        d="M50 18V50L70 70"
        stroke="currentColor"
        stroke-width="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  {:else}
    <div class="status-disc bg-destructive absolute inset-0 rounded-full" aria-hidden="true"></div>
    <svg
      class="text-brand-on relative size-12 sm:size-14"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        class="animate-draw-cross"
        d="M28 28L72 72M72 28L28 72"
        stroke="currentColor"
        stroke-width="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  {/if}
</div>

<style>
  .status-disc {
    transform: scale(0.8);
    opacity: 0;
    animation: discIn 0.35s ease-out forwards;
  }

  .animate-draw-check {
    stroke-dasharray: 120;
    stroke-dashoffset: 120;
    animation: drawStroke 0.5s ease-out 0.3s forwards;
  }

  .animate-draw-cross {
    stroke-dasharray: 130;
    stroke-dashoffset: 130;
    animation: drawStroke 0.5s ease-out 0.3s forwards;
  }

  .animate-spin-slow {
    animation: spinSlow 4s linear infinite;
  }

  @keyframes discIn {
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes drawStroke {
    to {
      stroke-dashoffset: 0;
    }
  }

  @keyframes spinSlow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
