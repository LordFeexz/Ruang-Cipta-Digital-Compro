<script lang="ts">
  import type { TransactionState } from "../../payment/getTransactionState";
  
  export let state: TransactionState;
</script>

<div class="relative w-24 h-24 sm:w-32 sm:h-32 mb-8 flex items-center justify-center">
  {#if state === "success"}
    <div class="absolute inset-0 bg-green-500/20 rounded-full blur-2xl animate-pulse"></div>
    <svg class="relative w-full h-full text-green-500" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle class="animate-draw-circle" cx="50" cy="50" r="45" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <path class="animate-draw-check" d="M30 50L45 65L70 35" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  {:else if state === "pending"}
    <div class="absolute inset-0 bg-amber-500/20 rounded-full blur-2xl animate-pulse"></div>
    <svg class="relative w-full h-full text-amber-500" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle class="animate-draw-circle" cx="50" cy="50" r="45" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <path class="animate-spin-slow origin-center" d="M50 25V50L65 65" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  {:else}
    <div class="absolute inset-0 bg-destructive/20 rounded-full blur-2xl animate-pulse"></div>
    <svg class="relative w-full h-full text-destructive" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle class="animate-draw-circle" cx="50" cy="50" r="45" stroke="currentColor" stroke-width="6" stroke-linecap="round" />
      <path class="animate-draw-cross" d="M35 35L65 65M65 35L35 65" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  {/if}
</div>

<style>
  .animate-draw-circle {
    stroke-dasharray: 283;
    stroke-dashoffset: 283;
    animation: drawCircle 0.8s ease-out forwards;
  }
  
  .animate-draw-check {
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
    animation: drawCheck 0.5s ease-out 0.6s forwards;
  }
  
  .animate-draw-cross {
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
    animation: drawCross 0.5s ease-out 0.6s forwards;
  }
  
  .animate-spin-slow {
    animation: spinSlow 4s linear infinite;
  }
  
  @keyframes drawCircle {
    to { stroke-dashoffset: 0; }
  }
  
  @keyframes drawCheck {
    to { stroke-dashoffset: 0; }
  }
  
  @keyframes drawCross {
    to { stroke-dashoffset: 0; }
  }
  
  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>
