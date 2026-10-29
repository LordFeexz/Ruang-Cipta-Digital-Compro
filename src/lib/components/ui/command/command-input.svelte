<script lang="ts">
  import { Command as CommandPrimitive } from "bits-ui";
  import Search from "@lucide/svelte/icons/search";
  import { Input } from "$lib/components/ui/input";
  import { cn } from "$lib/utils";

  let { ref = $bindable(null), class: className, value = $bindable(""), ...restProps }: CommandPrimitive.InputProps = $props();
</script>

<div class="flex shrink-0 items-center gap-3 border-b border-border px-5 focus-within:ring-2 focus-within:ring-ring focus-within:ring-inset" data-slot="command-input-wrapper">
  <Search class="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
  <CommandPrimitive.Input {value} {...restProps}>
    {#snippet child({ props })}
      <Input {...props} bind:value bind:ref class={cn("h-14 rounded-none border-0 bg-transparent px-0 text-base shadow-none focus-visible:ring-0", className)} />
    {/snippet}
  </CommandPrimitive.Input>
</div>
