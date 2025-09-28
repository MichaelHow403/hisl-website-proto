// /src/app/poem/page.tsx
import { MasterContentProvider } from '../providers/MasterContentProvider';
import { SectionRenderer } from '../../../components/SectionRenderer';

export default function PoemPage() {
  return (
    <MasterContentProvider slug="poem">
      <div>
        <SectionRenderer sections={[]} />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">The Craftsman's Creed</h1>
          <div className="prose max-w-none">
            <p className="text-lg leading-relaxed">
              Then prove we now with best endevour, what from our efforts yet may spring; he justly is dispised who never, did thought to aide his labours bring; for this is arts true indication - when skill is minister to thought, when types that are the minds creation - the hand to perfect form has wrought
            </p>
          </div>
        </div>
      </div>
    </MasterContentProvider>
  );
}
