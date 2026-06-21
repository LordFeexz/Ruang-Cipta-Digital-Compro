<script lang="ts">
  import type { TransactionFinishContent } from "../../../content/types";
  import StatusIcon from "./StatusIcon.svelte";
  import CSSConfetti from "./CSSConfetti.svelte";
  import AnimatedGradient from "../common/AnimatedGradient.svelte";
  import { Button } from "$lib/components/ui/button";

  export let content: TransactionFinishContent;
  export let lang: string;

  const careerMateLink = import.meta.env.PUBLIC_CAREER_MATE_URL || "https://apply-mate.site";
  const digitoolLink = import.meta.env.PUBLIC_DIGITOOL_URL || "https://dgtool.my.id";
</script>

<div class="relative min-h-[80vh] flex flex-col items-center justify-center p-4">
  <AnimatedGradient />
  
  <CSSConfetti active={true} />
  
  <div class="w-full max-w-2xl mx-auto flex flex-col items-center text-center z-10" data-aos="fade-up">
    <StatusIcon state="success" />
    
    <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 mt-6">
      {content.title.success}
    </h1>
    
    <p class="text-lg sm:text-xl text-muted-foreground mb-12 max-w-lg">
      {content.description.success}
    </p>

    <!-- Product CTAs -->
    <div class="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-lg" data-aos="fade-up" data-aos-delay="200">
      <Button href={careerMateLink} class="flex-1 rounded-full bg-brand-gradient hover:opacity-90 text-white shadow-lg px-6 py-6 text-base sm:text-lg">
        {lang === 'id' ? 'Ke Career Mate' : 'To Career Mate'}
      </Button>
      <Button href={digitoolLink} variant="outline" class="flex-1 rounded-full px-6 py-6 text-base sm:text-lg border-white/10 hover:bg-white/5 backdrop-blur-md">
        {lang === 'id' ? 'Ke DigiTool' : 'To DigiTool'}
      </Button>
    </div>
  </div>
</div>
