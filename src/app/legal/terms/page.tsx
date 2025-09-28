// /src/app/legal/terms/page.tsx
import { MasterContentProvider } from '../../providers/MasterContentProvider';
import { SectionRenderer } from '../../../../components/SectionRenderer';

export default function TermsPage() {
  return (
    <MasterContentProvider slug="legal/terms">
      <div>
        <SectionRenderer sections={[]} />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>
          <div className="prose max-w-none">
            <p>Use of this site implies agreement to fair and lawful use.</p>
            <p>Content is provided as-is; availability may change.</p>
            <p>All trademarks are property of their respective owners.</p>
          </div>
        </div>
      </div>
    </MasterContentProvider>
  );
}
