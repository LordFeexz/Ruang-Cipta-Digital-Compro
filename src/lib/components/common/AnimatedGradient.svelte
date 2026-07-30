<!--
  Ambient background wash.

  Opacity and blend mode come from theme tokens (--ambient-opacity /
  --ambient-blend) because `mix-blend-screen` only works on a dark canvas — on
  white it flattens the blobs into nothing. The dot grid is a CSS radial-gradient
  built from `currentColor` rather than a base64 SVG of white dots, so it is
  visible in both themes.
-->
<div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
  <div class="ambient absolute inset-0">
    <div
      class="bg-brand/30 animate-drift absolute top-[-25%] left-[-15%] size-[55%] rounded-full blur-[130px]"
    ></div>
    <div
      class="bg-brand/20 animate-drift absolute right-[-15%] bottom-[-25%] size-[55%] rounded-full blur-[130px]"
      style="animation-delay: -11s;"
    ></div>
  </div>

  <!-- Dot grid, fading out toward the bottom -->
  <div class="dots text-foreground absolute inset-0"></div>
</div>

<style>
  .ambient {
    opacity: var(--ambient-opacity);
    mix-blend-mode: var(--ambient-blend);
  }

  .dots {
    background-image: radial-gradient(currentColor 1px, transparent 1px);
    background-size: 24px 24px;
    opacity: 0.06;
    mask-image: linear-gradient(to bottom, black, transparent 75%);
    -webkit-mask-image: linear-gradient(to bottom, black, transparent 75%);
  }
</style>
