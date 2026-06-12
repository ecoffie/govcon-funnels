/**
 * Simple A/B Testing Utility
 * Uses localStorage for variant persistence and sends events to GA4
 */

export interface ABTestVariant {
  id: string;
  name: string;
}

export interface ABTest {
  id: string;
  name: string;
  variants: ABTestVariant[];
}

// Active A/B tests
export const AB_TESTS: Record<string, ABTest> = {
  'mi-free-cta': {
    id: 'mi-free-cta',
    name: 'Mindy Free CTA Button Text',
    variants: [
      { id: 'control', name: 'Get Free Access' },
      { id: 'variant-a', name: 'Start Free — No Credit Card' },
      { id: 'variant-b', name: 'Get Daily Contract Alerts' },
      { id: 'variant-c', name: 'Try Free for 30 Days' },
    ],
  },
  'mi-free-headline': {
    id: 'mi-free-headline',
    name: 'Mindy Free Headline',
    variants: [
      { id: 'control', name: 'Stop missing opportunities' },
      { id: 'variant-a', name: 'Your next contract is waiting' },
      { id: 'variant-b', name: 'Find contracts 10x faster' },
    ],
  },
};

/**
 * Get the current variant for a test (or assign one)
 * Deterministic assignment based on user ID or random
 */
export function getVariant(testId: string): ABTestVariant | null {
  if (typeof window === 'undefined') return null;

  const test = AB_TESTS[testId];
  if (!test) return null;

  const storageKey = `ab_${testId}`;
  const stored = localStorage.getItem(storageKey);

  if (stored) {
    const variant = test.variants.find((v) => v.id === stored);
    if (variant) return variant;
  }

  // Assign new variant (random distribution)
  const randomIndex = Math.floor(Math.random() * test.variants.length);
  const variant = test.variants[randomIndex];

  localStorage.setItem(storageKey, variant.id);

  // Track assignment in GA4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'ab_test_assignment', {
      test_id: testId,
      test_name: test.name,
      variant_id: variant.id,
      variant_name: variant.name,
    });
  }

  return variant;
}

/**
 * Track a conversion for an A/B test
 */
export function trackConversion(testId: string, conversionType: string = 'click') {
  if (typeof window === 'undefined') return;

  const test = AB_TESTS[testId];
  if (!test) return;

  const storageKey = `ab_${testId}`;
  const variantId = localStorage.getItem(storageKey);

  if (variantId && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'ab_test_conversion', {
      test_id: testId,
      test_name: test.name,
      variant_id: variantId,
      conversion_type: conversionType,
    });
  }
}

/**
 * Reset a test variant (for debugging)
 */
export function resetVariant(testId: string) {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(`ab_${testId}`);
}

// Global type declaration for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
