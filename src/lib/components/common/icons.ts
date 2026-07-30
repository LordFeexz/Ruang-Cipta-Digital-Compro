/**
 * Lucide icons, re-exported for use inside `.astro` templates.
 *
 * Why this file exists: `@lucide/svelte` v1 types each icon as a Svelte 5
 * `Component<LucideProps, {}, "">`, whose call signature is
 * `(internals: ComponentInternals, props: Props)`. Astro's type checker reads
 * the *first* parameter as the props type, so `<Mail class="size-4" />` fails
 * with `Property 'class' does not exist on type 'Brand<"ComponentInternals">'`
 * even though it renders correctly. Casting once here keeps the assertion in a
 * single documented place instead of scattering `as any` across the templates.
 *
 * Runtime is unaffected — these are the same module objects, so Astro's Svelte
 * renderer still recognises them. Per-icon subpath imports keep tree-shaking.
 *
 * Svelte components (`.svelte` files) should import from `@lucide/svelte`
 * directly; the typing gap only affects `.astro` files.
 */
import AlertCircleRaw from "@lucide/svelte/icons/alert-circle";
import ArrowRightRaw from "@lucide/svelte/icons/arrow-right";
import ArrowUpRightRaw from "@lucide/svelte/icons/arrow-up-right";
import BarChart3Raw from "@lucide/svelte/icons/bar-chart-3";
import CheckRaw from "@lucide/svelte/icons/check";
import LeafRaw from "@lucide/svelte/icons/leaf";
import LightbulbRaw from "@lucide/svelte/icons/lightbulb";
import MailRaw from "@lucide/svelte/icons/mail";
import MinusRaw from "@lucide/svelte/icons/minus";
import PieChartRaw from "@lucide/svelte/icons/pie-chart";
import TrendingUpRaw from "@lucide/svelte/icons/trending-up";
import UnlockRaw from "@lucide/svelte/icons/unlock";
import XRaw from "@lucide/svelte/icons/x";
import ZapRaw from "@lucide/svelte/icons/zap";

/** Props an icon accepts when rendered from an `.astro` template. */
export interface AstroIconProps {
  class?: string;
  size?: number | string;
  strokeWidth?: number | string;
  color?: string;
  "aria-hidden"?: boolean | "true" | "false";
  "aria-label"?: string;
}

export type AstroIcon = (props: AstroIconProps) => any;

const asAstroIcon = (component: unknown) => component as unknown as AstroIcon;

export const AlertCircle = asAstroIcon(AlertCircleRaw);
export const ArrowRight = asAstroIcon(ArrowRightRaw);
export const ArrowUpRight = asAstroIcon(ArrowUpRightRaw);
export const BarChart3 = asAstroIcon(BarChart3Raw);
export const Check = asAstroIcon(CheckRaw);
export const Leaf = asAstroIcon(LeafRaw);
export const Lightbulb = asAstroIcon(LightbulbRaw);
export const Mail = asAstroIcon(MailRaw);
export const Minus = asAstroIcon(MinusRaw);
export const PieChart = asAstroIcon(PieChartRaw);
export const TrendingUp = asAstroIcon(TrendingUpRaw);
export const Unlock = asAstroIcon(UnlockRaw);
export const X = asAstroIcon(XRaw);
export const Zap = asAstroIcon(ZapRaw);
