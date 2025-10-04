import posthog from 'posthog-js';

// Check if PostHog is available and in production
const isPostHogAvailable = (): boolean => {
  return typeof window !== 'undefined' && 
         process.env.NODE_ENV === 'production' && 
         !!process.env.NEXT_PUBLIC_POSTHOG_KEY;
};

export const analytics = {
  formSubmit: (formId: 'contact' | 'rfp' | 'newsletter' | 'careers') => {
    if (isPostHogAvailable()) {
      posthog?.capture('form_submitted', { form_id: formId });
    }
  },
  
  ctaClick: (label: string, location: string) => {
    if (isPostHogAvailable()) {
      posthog?.capture('cta_clicked', { label, location });
    }
  },
  
  agentCardClick: (agentName: string, sector: string) => {
    if (isPostHogAvailable()) {
      posthog?.capture('agent_card_clicked', { agent: agentName, sector });
    }
  },
  
  sectorView: (sector: string) => {
    if (isPostHogAvailable()) {
      posthog?.capture('sector_viewed', { sector });
    }
  },
  
  globeInteraction: (action: 'prompt_sent' | 'arc_viewed' | 'energy_toggled') => {
    if (isPostHogAvailable()) {
      posthog?.capture('globe_interaction', { action });
    }
  },
  
  newsFilter: (topic: string) => {
    if (isPostHogAvailable()) {
      posthog?.capture('news_filter_used', { topic });
    }
  },
} as const;
