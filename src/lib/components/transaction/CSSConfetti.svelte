<script lang="ts">
  import { onMount } from "svelte";

  export let active: boolean = false;
  
  let showConfetti = false;
  
  onMount(() => {
    if (active && window.matchMedia && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      showConfetti = true;
      setTimeout(() => {
        showConfetti = false;
      }, 4000);
    }
  });
</script>

{#if showConfetti}
  <div class="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
    {#each Array(40) as _, i}
      <div 
        class="confetti-piece" 
        style="
          --c-left: {Math.random() * 100}%;
          --c-color: {['#22c55e', '#3b82f6', '#eab308', '#ec4899', '#a855f7'][Math.floor(Math.random() * 5)]};
          --c-delay: {Math.random() * 0.5}s;
          --c-duration: {1.5 + Math.random() * 1.5}s;
          --c-rotate: {Math.random() * 360}deg;
          --c-width: {6 + Math.random() * 8}px;
          --c-height: {12 + Math.random() * 10}px;
        "
      ></div>
    {/each}
  </div>
{/if}

<style>
  .confetti-piece {
    position: absolute;
    top: -20px;
    left: var(--c-left);
    width: var(--c-width);
    height: var(--c-height);
    background-color: var(--c-color);
    border-radius: 2px;
    opacity: 0;
    animation: fall var(--c-duration) ease-in var(--c-delay) forwards;
  }
  
  @keyframes fall {
    0% {
      opacity: 1;
      transform: translateY(0) rotate(0deg);
    }
    100% {
      opacity: 0;
      transform: translateY(100vh) rotate(var(--c-rotate));
    }
  }
</style>
