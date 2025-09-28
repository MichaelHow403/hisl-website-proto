/**
 * Master content loader that prefers master content over legacy
 */

interface MasterSection {
  sectionId: string;
  component: string;
  props: any;
}

interface MasterContent {
  slug: string;
  sections: MasterSection[];
  source: "master" | "legacy";
}

export async function loadMasterSectionsClient(slug: string): Promise<MasterContent> {
  try {
    const response = await fetch(`/api/v1/site/page?slug=${slug}`);
    if (response.ok) {
      const data = await response.json();
      console.log(`[${slug}] source: master`);
      return { 
        slug, 
        sections: data.sections ?? [], 
        source: "master" as const 
      };
    }
  } catch (e) {
    console.warn(`[${slug}] master API error:`, e);
  }
  
  console.log(`[${slug}] source: legacy`);
  return { 
    slug, 
    sections: [], 
    source: "legacy" as const 
  };
}
