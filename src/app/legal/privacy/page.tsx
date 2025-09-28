// /src/app/legal/privacy/page.tsx
import { MasterContentProvider } from '../../providers/MasterContentProvider';
import { SectionRenderer } from '../../../../components/SectionRenderer';

export default function PrivacyPage() {
  return (
    <MasterContentProvider slug="legal/privacy">
      <div>
        <SectionRenderer sections={[]} />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <div className="prose max-w-none">
            <p>We collect only what we need to respond to you.</p>
            <p>Forms are idempotent and stored as normalized records or artifacts.</p>
            <p>We do not sell your data. You can request deletion via /contact.</p>
          </div>
        </div>
      </div>
    </MasterContentProvider>
  );
}
