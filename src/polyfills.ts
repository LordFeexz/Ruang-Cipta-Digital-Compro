/**
 * Client-side polyfills — processed by Vite/Astro bundler (client-side only).
 * core-js is tree-shaken: only APIs that are missing in the target browsers
 * (defined in .browserslistrc) are included in the final bundle.
 *
 * Coverage targets: Chrome 87+, Firefox 78+, Safari 13+, iOS 13+, Edge 88+
 *
 * All import paths below are verified to exist in core-js@3.49.0.
 */

// ── Promise ──────────────────────────────────────────────────────────────────
import "core-js/actual/promise/with-resolvers"; // Chrome 119+ (used by pdfjs-dist)
import "core-js/actual/promise/all-settled";    // Chrome 76+
import "core-js/actual/promise/any";            // Chrome 85+
import "core-js/actual/promise/finally";        // Chrome 63+

// ── Array ─────────────────────────────────────────────────────────────────────
import "core-js/actual/array/at";               // Chrome 92+
import "core-js/actual/array/find-last";        // Chrome 97+
import "core-js/actual/array/find-last-index";  // Chrome 97+
import "core-js/actual/array/flat";             // Chrome 69+
import "core-js/actual/array/flat-map";         // Chrome 69+
import "core-js/actual/array/from";             // IE 11 gap / old iOS
import "core-js/actual/array/to-reversed";      // Chrome 110+
import "core-js/actual/array/to-sorted";        // Chrome 110+
import "core-js/actual/array/to-spliced";       // Chrome 110+
import "core-js/actual/array/with";             // Chrome 110+

// ── Object ────────────────────────────────────────────────────────────────────
import "core-js/actual/object/assign";          // IE 11 gap
import "core-js/actual/object/from-entries";    // Chrome 73+
import "core-js/actual/object/has-own";         // Chrome 93+

// ── String ────────────────────────────────────────────────────────────────────
import "core-js/actual/string/at";              // Chrome 92+
import "core-js/actual/string/replace-all";     // Chrome 85+

// ── Set methods (proposal) ────────────────────────────────────────────────────
import "core-js/actual/set/difference";         // Chrome 122+
import "core-js/actual/set/intersection";       // Chrome 122+
import "core-js/actual/set/union";              // Chrome 122+

// ── Global utilities ──────────────────────────────────────────────────────────
import "core-js/actual/global-this";            // Chrome 71+
import "core-js/actual/queue-microtask";        // Chrome 71+
import "core-js/actual/set-immediate";          // missing in some Safari versions
import "core-js/actual/structured-clone";       // Chrome 98+
