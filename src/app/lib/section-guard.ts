/**
 * Section guard to prevent stray sections and ensure only whitelisted content is rendered
 */

import sectionRegistry from './section-registry.json';

interface Section {
  sectionId: string;
  component: string;
  props: any;
}

interface GuardedSection extends Section {
  _guarded: boolean;
}

/**
 * Guards sections against unauthorized content
 * Filters out sections not in the allowedSections whitelist
 * Logs warnings for filtered sections
 */
export function guardSections(sections: Section[]): GuardedSection[] {
  const allowedSections = sectionRegistry.allowedSections as string[];
  const allowedComponents = sectionRegistry.allowedComponents as string[];
  
  const guardedSections: GuardedSection[] = [];
  const filteredSections: string[] = [];
  
  for (const section of sections) {
    // Check if sectionId is allowed
    if (!allowedSections.includes(section.sectionId)) {
      console.warn(`[SectionGuard] Filtered out unauthorized section: ${section.sectionId}`);
      filteredSections.push(section.sectionId);
      continue;
    }
    
    // Check if component is allowed
    if (!allowedComponents.includes(section.component)) {
      console.warn(`[SectionGuard] Filtered out unauthorized component: ${section.component} in section ${section.sectionId}`);
      filteredSections.push(`${section.sectionId}(${section.component})`);
      continue;
    }
    
    // Section passed all checks
    guardedSections.push({
      ...section,
      _guarded: true
    });
  }
  
  if (filteredSections.length > 0) {
    console.warn(`[SectionGuard] Filtered ${filteredSections.length} unauthorized sections:`, filteredSections);
  }
  
  return guardedSections;
}

/**
 * Validates that a section has all required props according to the registry
 */
export function validateSectionProps(section: Section): boolean {
  const componentConfig = sectionRegistry[section.component as keyof typeof sectionRegistry];
  
  if (!componentConfig || typeof componentConfig !== 'object' || !('required' in componentConfig)) {
    console.warn(`[SectionGuard] Unknown component: ${section.component}`);
    return false;
  }
  
  const requiredProps = (componentConfig as any).required as string[];
  const missingProps: string[] = [];
  
  for (const prop of requiredProps) {
    if (!(prop in section.props)) {
      missingProps.push(prop);
    }
  }
  
  if (missingProps.length > 0) {
    console.warn(`[SectionGuard] Section ${section.sectionId} missing required props:`, missingProps);
    return false;
  }
  
  return true;
}

/**
 * Comprehensive section validation and guarding
 */
export function validateAndGuardSections(sections: Section[]): {
  validSections: GuardedSection[];
  invalidSections: Section[];
  warnings: string[];
} {
  const warnings: string[] = [];
  const validSections: GuardedSection[] = [];
  const invalidSections: Section[] = [];
  
  for (const section of sections) {
    const isValid = validateSectionProps(section);
    
    if (isValid) {
      validSections.push({
        ...section,
        _guarded: true
      });
    } else {
      invalidSections.push(section);
      warnings.push(`Invalid section: ${section.sectionId}`);
    }
  }
  
  return {
    validSections,
    invalidSections,
    warnings
  };
}

/**
 * Check if a section is whitelisted
 */
export function isSectionAllowed(sectionId: string): boolean {
  const allowedSections = sectionRegistry.allowedSections as string[];
  return allowedSections.includes(sectionId);
}

/**
 * Check if a component is whitelisted
 */
export function isComponentAllowed(component: string): boolean {
  const allowedComponents = sectionRegistry.allowedComponents as string[];
  return allowedComponents.includes(component);
}




