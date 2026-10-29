<script lang="ts">
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import { Button } from "$lib/components/ui/button";
</script>
<Button variant="ghost" class="mt-5 h-auto min-h-11 justify-start gap-3 px-0 text-sm text-muted-foreground hover:bg-transparent hover:text-foreground"
  onclick={() => document.dispatchEvent(new Event("rcd:open-command"))}>
  <span class="sm:hidden">Buka menu cepat</span>
  <span class="hidden items-center gap-1.5 sm:inline-flex">Tekan <kbd class="rounded border border-input bg-muted px-1.5 py-0.5 font-mono text-xs">Ctrl</kbd><kbd class="rounded border border-input bg-muted px-1.5 py-0.5 font-mono text-xs">K</kbd> untuk menjelajah</span>
  <ArrowRight class="size-4" aria-hidden="true" />
</Button>
