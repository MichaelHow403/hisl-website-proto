import Img from '@/components/Img';
import GlobalHeader from '@/components/sections/GlobalHeader';
import GlobalFooter from '@/components/sections/GlobalFooter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image Demo - HISL',
  description: 'Demonstration of the optimized Img component for Sharp-generated images.',
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
              Optimized Image Component Demo
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Examples of using the &lt;Img&gt; component with Sharp-optimized images.
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
{`<Img 
  name="AI_DNA" 
  alt="Abstract double helix made of circuitry representing AI DNA"
/>`}
              </pre>
              
              <h3 className="text-lg font-semibold text-text mb-4 mt-6">Result:</h3>
              <div className="max-w-2xl">
                <Img 
                  name="AI_DNA" 
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
{`<Img 
  name="ai_technology" 
  alt="AI technology visualization"
  width={800}
  height={600}
  className="rounded-lg shadow-lg"
/>`}
              </pre>
              
              <h3 className="text-lg font-semibold text-text mb-4 mt-6">Result:</h3>
              <div className="max-w-2xl">
                <Img 
                  name="ai_technology" 
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
{`<Img 
  name="ai_construction_bridge_banner" 
  alt="Bridge construction scene augmented by AI overlays"
  priority={true}
  width={1200}
  height={600}
/>`}
              </pre>
              
              <h3 className="text-lg font-semibold text-text mb-4 mt-6">Result:</h3>
              <div className="max-w-4xl">
                <Img 
                  name="ai_construction_bridge_banner" 
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
  <Img name="data_sovereignty_badge" alt="Data sovereignty badge" />
  <Img name="compliance_shield_premium" alt="Premium compliance shield" />
  <Img name="ai_construction_bridge_banner" alt="Bridge construction scene" />
</div>`}
              </pre>
              
              <h3 className="text-lg font-semibold text-text mb-4 mt-6">Result:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Img name="data_sovereignty_badge" alt="Data sovereignty badge" />
                  <Img name="compliance_shield_premium" alt="Premium compliance shield" />
                  <Img name="ai_construction_bridge_banner" alt="Bridge construction scene" />
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
{`import Img from '@/components/Img';

// Basic usage
<Img name="AI_DNA" alt="Abstract double helix made of circuitry representing AI DNA" />

// With custom dimensions
<Img 
  name="ai_technology" 
  alt="AI technology visualization"
  width={800} 
  height={600} 
/>

// Priority loading for above-the-fold images
<Img 
  name="hero-image" 
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
