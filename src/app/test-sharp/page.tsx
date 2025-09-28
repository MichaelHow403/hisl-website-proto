"use client";

import { LOCKED_CONTENT } from "@/lib/content-lock";
import { IMAGES } from "@/lib/imagery";
import OptimizedImage from "@/components/OptimizedImage";

/**
 * Sharp Pipeline Test Page
 * 
 * Demonstrates the Sharp-generated imagery manifest working correctly
 */
export default function TestSharpPage() {
  // Test accessing locked content
  const home = LOCKED_CONTENT.home;
  
  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Sharp Pipeline Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Test hero image */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Hero Image</h2>
            <p className="text-sm text-gray-400 mb-4">
              Image ID: {home.hero.imageId}
            </p>
            <div className="aspect-video">
              <OptimizedImage 
                imageId={home.hero.imageId} 
                alt="Hero image" 
                className="w-full h-full rounded"
              />
            </div>
          </div>

          {/* Test overlay image */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Overlay Image</h2>
            <p className="text-sm text-gray-400 mb-4">
              Image ID: {home.hero.overlayImageId}
            </p>
            <div className="aspect-video">
              <OptimizedImage 
                imageId={home.hero.overlayImageId} 
                alt="Overlay image" 
                className="w-full h-full rounded"
              />
            </div>
          </div>

          {/* Test problem image */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Problem Image</h2>
            <p className="text-sm text-gray-400 mb-4">
              Image ID: {home.problem.imageId}
            </p>
            <div className="aspect-video">
              <OptimizedImage 
                imageId={home.problem.imageId} 
                alt="Problem image" 
                className="w-full h-full rounded"
              />
            </div>
          </div>

          {/* Test solution badge */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Solution Badge</h2>
            <p className="text-sm text-gray-400 mb-4">
              Image ID: {home.solution.features[0].iconId}
            </p>
            <div className="aspect-square">
              <OptimizedImage 
                imageId={home.solution.features[0].iconId} 
                alt="Solution badge" 
                className="w-full h-full rounded"
              />
            </div>
          </div>

          {/* Test poem backdrop */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Poem Backdrop</h2>
            <p className="text-sm text-gray-400 mb-4">
              Image ID: {home.poem.imageId}
            </p>
            <div className="aspect-square">
              <OptimizedImage 
                imageId={home.poem.imageId} 
                alt="Poem backdrop" 
                className="w-full h-full rounded"
              />
            </div>
          </div>

          {/* Test globe base */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Globe Base</h2>
            <p className="text-sm text-gray-400 mb-4">
              Image ID: globe_base
            </p>
            <div className="aspect-square">
              <OptimizedImage 
                imageId="globe_base" 
                alt="Globe base" 
                className="w-full h-full rounded"
              />
            </div>
          </div>
        </div>

        {/* Show manifest info */}
        <div className="mt-12 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Manifest Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Available Images</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                {Object.keys(IMAGES).slice(0, 10).map(imageId => (
                  <li key={imageId}>• {imageId}</li>
                ))}
                {Object.keys(IMAGES).length > 10 && (
                  <li>... and {Object.keys(IMAGES).length - 10} more</li>
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Sample Image Data</h3>
              <pre className="text-xs text-gray-400 bg-gray-900 p-3 rounded overflow-auto">
                {JSON.stringify(IMAGES.home_hero_main, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
