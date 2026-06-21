<script lang="ts">
  import { onMount } from "svelte";
  import { cubicOut } from "svelte/easing";
  import { tweened } from "svelte/motion";

  export let value: number;
  export let duration: number = 2000;
  
  let node: HTMLElement;
  let visible = false;

  const count = tweened(0, {
    duration,
    easing: cubicOut
  });

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !visible) {
          visible = true;
          count.set(value);
        }
      },
      { threshold: 0.1 }
    );

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) observer.unobserve(node);
    };
  });

  // Format large numbers (e.g., 100000 -> 100K)
  $: formattedValue = $count >= 1000000 
    ? ($count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
    : $count >= 1000 
      ? ($count / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
      : Math.floor($count).toString();
</script>

<span bind:this={node}>
  {formattedValue}
</span>
