'use client';

import { usePostHogPageView } from '@/lib/posthog-provider';

// OK: Legacy component
export function PageViewTracker() {
  usePostHogPageView();
  return null;
}
