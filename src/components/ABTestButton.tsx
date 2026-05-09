'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getVariant, trackConversion, AB_TESTS } from '@/lib/ab-test';

interface ABTestButtonProps {
  testId: string;
  href: string;
  className?: string;
  fallback?: string; // Fallback text for SSR
  onClick?: () => void;
}

export function ABTestButton({
  testId,
  href,
  className = '',
  fallback = 'Get Started',
  onClick,
}: ABTestButtonProps) {
  const [buttonText, setButtonText] = useState(fallback);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const variant = getVariant(testId);
    if (variant) {
      setButtonText(variant.name);
    }
  }, [testId]);

  const handleClick = () => {
    trackConversion(testId, 'click');
    onClick?.();
  };

  // Show fallback during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <Link
        href={href}
        className={className}
      >
        {fallback}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
    >
      {buttonText}
    </Link>
  );
}

/**
 * A/B test content component for headlines, descriptions, etc.
 */
interface ABTestContentProps {
  testId: string;
  fallback: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function ABTestContent({
  testId,
  fallback,
  className = '',
  as: Component = 'span',
}: ABTestContentProps) {
  const [content, setContent] = useState(fallback);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const variant = getVariant(testId);
    if (variant) {
      setContent(variant.name);
    }
  }, [testId]);

  if (!mounted) {
    return <Component className={className}>{fallback}</Component>;
  }

  return <Component className={className}>{content}</Component>;
}

/**
 * Debug component to show current A/B test assignments
 */
export function ABTestDebug() {
  const [assignments, setAssignments] = useState<Record<string, string>>({});

  useEffect(() => {
    const current: Record<string, string> = {};
    Object.keys(AB_TESTS).forEach((testId) => {
      const variant = getVariant(testId);
      if (variant) {
        current[testId] = `${variant.id}: ${variant.name}`;
      }
    });
    setAssignments(current);
  }, []);

  if (Object.keys(assignments).length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-slate-800 text-white text-xs p-3 rounded-lg shadow-lg max-w-xs z-50">
      <div className="font-bold mb-2">A/B Test Variants</div>
      {Object.entries(assignments).map(([testId, value]) => (
        <div key={testId} className="mb-1">
          <span className="text-slate-400">{testId}:</span> {value}
        </div>
      ))}
    </div>
  );
}
