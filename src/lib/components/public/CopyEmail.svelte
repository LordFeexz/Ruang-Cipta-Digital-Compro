<script lang="ts">
  import Copy from "@lucide/svelte/icons/copy";
  import Check from "@lucide/svelte/icons/check";
  import { Button } from "$lib/components/ui/button";
  import { contactEmail } from "./content";
  let feedback = $state("");
  let copied = $state(false);
  let busy = $state(false);
  async function copy() {
    busy = true;
    try {
      await navigator.clipboard.writeText(contactEmail);
      copied = true;
      feedback = "Email disalin.";
    } catch {
      copied = false;
      feedback = "Email belum dapat disalin. Salin secara manual: " + contactEmail;
    } finally {
      busy = false;
    }
  }
</script>
<div class="mt-5">
  <Button variant="outline" class="min-h-11 gap-2 px-4" onclick={copy} disabled={busy}>
    {#if copied}<Check class="size-4" aria-hidden="true" />{:else}<Copy class="size-4" aria-hidden="true" />{/if}
    {busy ? "Menyalin…" : copied ? "Email disalin" : "Salin email"}
  </Button>
  <p role="status" aria-live="polite" aria-atomic="true" class="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground [overflow-wrap:anywhere]">{feedback}</p>
</div>
