<script lang="ts">
  import type { TransactionState } from "../../payment/getTransactionState";
  import Check from "@lucide/svelte/icons/check";
  import Clock from "@lucide/svelte/icons/clock";
  import X from "@lucide/svelte/icons/x";

  export let state: TransactionState;
</script>

<div class={"flex size-16 items-center justify-center rounded-xl border " + (
  state === "success" ? "border-brand-ring/60 bg-brand-soft text-brand-quiet"
    : state === "pending" ? "border-warning/40 bg-warning/10 text-warning"
      : "border-destructive/40 bg-destructive/10 text-destructive"
)} aria-hidden="true">
  {#if state === "success"}
    <Check class="size-8" />
  {:else if state === "pending"}
    <Clock class="size-8" />
  {:else}
    <X class="size-8" />
  {/if}
</div>
