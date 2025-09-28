import OptimizedImage from '@/components/OptimizedImage';
import GlobalHeader from '@/components/sections/GlobalHeader';
import GlobalFooter from '@/components/sections/GlobalFooter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sharp Pipeline Demo - HISL',
  description: 'Demonstration of the Sharp-processed images using OptimizedImage component.',
};

export default function ImageDemoPage() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <GlobalHeader />
      
      <div className="container-wrap py-12">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-spectral font-bold text-brandGold mb-4">
              Sharp Pipeline Demo
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Examples of using the &lt;OptimizedImage&gt; component with Sharp-processed images.
            </p>
          </div>
          
          {/* Example 1: Basic Usage */}
          <section className="mb-12">
            <h2 className="text-2xl font-spectral font-semibold text-brandGold mb-6">
              Basic Usage
            </h2>
            <div className="bg-panel border border-edge rounded-lg p-6">
              <h3 className="text-lg font-semibold text-text mb-4">Code:</h3>
              <pre className="bg-bg border border-edge rounded p-4 text-sm text-muted overflow-x-auto">
{`<OptimizedImage 
  imageId="fusion_ai_ethics" 
  alt="Abstract double helix made of circuitry representing AI DNA"
/>`}
              </pre>
              
              <h3 className="text-lg font-semibold text-text mb-4 mt-6">Result:</h3>
              <div className="max-w-2xl">
                <OptimizedImage 
                  imageId="fusion_ai_ethics" 
                  alt="Abstract double helix made of circuitry representing AI DNA"
                />
              </div>
            </div>
          </section>

          {/* Example 2: Custom Dimensions */}
          <section className="mb-12">
            <h2 className="text-2xl font-spectral font-semibold text-brandGold mb-6">
              Custom Dimensions
            </h2>
            <div className="bg-panel border border-edge rounded-lg p-6">
              <h3 className="text-lg font-semibold text-text mb-4">Code:</h3>
              <pre className="bg-bg border border-edge rounded p-4 text-sm text-muted overflow-x-auto">
{`<OptimizedImage 
  imageId="home_hero_overlay" 
  alt="AI technology visualization"
  width={800}
  height={600}
  className="rounded-lg shadow-lg"
/>`}
              </pre>
              
              <h3 className="text-lg font-semibold text-text mb-4 mt-6">Result:</h3>
              <div className="max-w-2xl">
                <OptimizedImage 
                  imageId="home_hero_overlay" 
                  alt="AI technology visualization"
                  width={800}
                  height={600}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </section>

          {/* Example 3: Priority Loading */}
          <section className="mb-12">
            <h2 className="text-2xl font-spectral font-semibold text-brandGold mb-6">
              Priority Loading (Above the Fold)
            </h2>
            <div className="bg-panel border border-edge rounded-lg p-6">
              <h3 className="text-lg font-semibold text-text mb-4">Code:</h3>
              <pre className="bg-bg border border-edge rounded p-4 text-sm text-muted overflow-x-auto">
{`<OptimizedImage 
  imageId="home_hero_main" 
  alt="Bridge construction scene augmented by AI overlays"
  priority={true}
  width={1200}
  height={600}
/>`}
              </pre>
              
              <h3 className="text-lg font-semibold text-text mb-4 mt-6">Result:</h3>
              <div className="max-w-4xl">
                <OptimizedImage 
                  imageId="home_hero_main" 
                  alt="Bridge construction scene augmented by AI overlays"
                  priority={true}
                  width={1200}
                  height={600}
                />
              </div>
            </div>
          </section>

          {/* Example 4: Grid Layout */}
          <section className="mb-12">
            <h2 className="text-2xl font-spectral font-semibold text-brandGold mb-6">
              Grid Layout
            </h2>
            <div className="bg-panel border border-edge rounded-lg p-6">
              <h3 className="text-lg font-semibold text-text mb-4">Code:</h3>
              <pre className="bg-bg border border-edge rounded p-4 text-sm text-muted overflow-x-auto">
{`<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <OptimizedImage imageId="home_solution_badge" alt="Data sovereignty badge" />
  <OptimizedImage imageId="home_solution_security" alt="Premium compliance shield" />
  <OptimizedImage imageId="home_hero_main" alt="Bridge construction scene" />
</div>`}
              </pre>
              
              <h3 className="text-lg font-semibold text-text mb-4 mt-6">Result:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <OptimizedImage imageId="home_solution_badge" alt="Data sovereignty badge" />
                  <OptimizedImage imageId="home_solution_security" alt="Premium compliance shield" />
                  <OptimizedImage imageId="home_hero_main" alt="Bridge construction scene" />
              </div>
            </div>
          </section>

          {/* Usage Instructions */}
          <section className="mb-12">
            <h2 className="text-2xl font-spectral font-semibold text-brandGold mb-6">
              How to Use
            </h2>
            <div className="bg-panel border border-edge rounded-lg p-6">
              <div className="prose prose-lg max-w-none">
                <h3>1. Prepare Your Images</h3>
                <p>
                  Place your source images in the <code>/public/optimized/</code> directory with the following naming convention:
                </p>
                <ul>
                  <li><code>image-name-1200.webp</code> - 1200px width version</li>
                  <li><code>image-name-2400.webp</code> - 2400px width version (retina)</li>
                  <li><code>image-name-blur.webp</code> - Blur placeholder (low quality)</li>
                </ul>

                <h3>2. Use the Component</h3>
                <pre>
{`import OptimizedImage from '@/components/OptimizedImage';

// Basic usage
<OptimizedImage imageId="fusion_ai_ethics" alt="Abstract double helix made of circuitry representing AI DNA" />

// With custom dimensions
<OptimizedImage 
  imageId="home_hero_overlay" 
  alt="AI technology visualization"
  width={800} 
  height={600} 
/>

// Priority loading for above-the-fold images
<OptimizedImage 
  imageId="home_hero_main" 
  alt="Hero image description"
  priority={true} 
/>`}
                </pre>

                <h3>3. Benefits</h3>
                <ul>
                  <li>✅ Automatic WebP optimization</li>
                  <li>✅ Retina display support (2400px on high-DPI screens)</li>
                  <li>✅ Blur placeholder while loading</li>
                  <li>✅ Responsive sizing with srcSet</li>
                  <li>✅ Next.js Image optimization</li>
                  <li>✅ Lazy loading by default</li>
                  <li>✅ Priority loading option</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
      
      <GlobalFooter />
    </main>
  );
}
