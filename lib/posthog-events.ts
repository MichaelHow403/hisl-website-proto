'use client';

import posthog from 'posthog-js';

// Type-safe event definitions
export interface PostHogEventProperties {
  [key: string]: string | number | boolean | null | undefined;
}

// Core tracking events
export const trackEvent = (
  eventName: string,
  properties?: PostHogEventProperties
) => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    posthog.capture(eventName, properties);
  }
};

// Specific event helpers for common actions
export const trackButtonClick = (buttonName: string, location?: string) => {
  trackEvent('button_clicked', {
    button_name: buttonName,
    location: location || 'unknown',
  });
};

export const trackFormSubmission = (formName: string, success: boolean) => {
  trackEvent('form_submitted', {
    form_name: formName,
    success,
  });
};

export const trackPageView = (pageName: string, section?: string) => {
  trackEvent('page_viewed', {
    page_name: pageName,
    section: section || 'main',
  });
};

export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent('file_downloaded', {
    file_name: fileName,
    file_type: fileType,
  });
};

export const trackExternalLink = (url: string, linkText?: string) => {
  trackEvent('external_link_clicked', {
    url: url.replace(/^https?:\/\//, ''), // Remove protocol for privacy
    link_text: linkText ? linkText.substring(0, 50) : 'unknown', // Truncate for privacy
  });
};

export const trackContactAction = (action: 'email' | 'phone' | 'form', method?: string) => {
  trackEvent('contact_action', {
    action_type: action,
    method: method || 'unknown',
  });
};

export const trackNavigation = (from: string, to: string) => {
  trackEvent('navigation', {
    from_page: from,
    to_page: to,
  });
};

// Utility to check if PostHog is available
export const isPostHogAvailable = (): boolean => {
  return typeof window !== 'undefined' && 
         process.env.NODE_ENV === 'production' && 
         !!process.env.NEXT_PUBLIC_POSTHOG_KEY;
};
