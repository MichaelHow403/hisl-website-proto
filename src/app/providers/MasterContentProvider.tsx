// /src/app/providers/MasterContentProvider.tsx
"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import fs from 'fs';
import path from 'path';

interface MasterContent {
  slug: string;
  title: string;
  sections: Array<{
    sectionId: string;
    component: string;
    props: any;
  }>;
}

interface MasterContentContextType {
  content: MasterContent | null;
  loading: boolean;
  error: string | null;
}

const MasterContentContext = createContext<MasterContentContextType>({
  content: null,
  loading: false,
  error: null,
});

export function useMasterContent() {
  return useContext(MasterContentContext);
}

interface MasterContentProviderProps {
  slug: string;
  children: React.ReactNode;
}

export function MasterContentProvider({ slug, children }: MasterContentProviderProps) {
  const [content, setContent] = useState<MasterContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadContent() {
      try {
        setLoading(true);
        setError(null);
        
        // Try to load master content first
        const masterContentPath = path.join(process.cwd(), 'content', 'pages', `${slug}.json`);
        
        // In production, this would be a fetch to an API endpoint
        // For now, we'll use a dynamic import approach
        let masterContent: MasterContent | null = null;
        
        try {
          // Try to load master content from API first
          const response = await fetch(`/api/v1/site/page?slug=${slug}`);
          if (response.ok) {
            masterContent = await response.json();
            console.log(`[${slug}] source: master`);
          } else {
            console.log(`[${slug}] source: legacy (API returned ${response.status})`);
          }
        } catch (apiError) {
          console.log(`[${slug}] source: legacy (API error: ${apiError.message})`);
        }
        
        setContent(masterContent);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load content');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadContent();
    }
  }, [slug]);

  return (
    <MasterContentContext.Provider value={{ content, loading, error }}>
      {children}
    </MasterContentContext.Provider>
  );
}
