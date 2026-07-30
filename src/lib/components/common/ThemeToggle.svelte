<script lang="ts">
  import Sun from "@lucide/svelte/icons/sun";
  import Moon from "@lucide/svelte/icons/moon";
  import { onMount } from "svelte";

  export let labelLight = "Switch to light theme";
  export let labelDark = "Switch to dark theme";

  let isDark = true;

  // The inline script in BaseLayout resolves the theme before first paint and a
  // MutationObserver there persists any class change to localStorage — so this
  // toggle only has to flip the class. No FOUC, no extra persistence code.
  onMount(() => {
    isDark = document.documentElement.classList.contains("dark");
  });

  function toggle() {
    isDark = document.documentElement.classList.toggle("dark");
  }
</script>

<button
  type="button"
  onclick={toggle}
  aria-label={isDark ? labelLight : labelDark}
  aria-pressed={isDark}
  title={isDark ? labelLight : labelDark}
  class="text-muted-foreground hover:text-foreground hover:bg-accent focus-visible:outline-ring relative grid size-11 cursor-pointer place-items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 md:size-9"
>
  <!-- Both icons are rendered and cross-faded so the button never changes size. -->
  <Sun
    class="absolute size-[1.05rem] scale-100 rotate-0 transition-all duration-200 dark:scale-0 dark:-rotate-90"
    aria-hidden="true"
  />
  <Moon
    class="absolute size-[1.05rem] scale-0 rotate-90 transition-all duration-200 dark:scale-100 dark:rotate-0"
    aria-hidden="true"
  />
</button>
