// /src/app/contact/page.tsx
import { MasterContentProvider } from '../providers/MasterContentProvider';
import { SectionRenderer } from '../../../components/SectionRenderer';

export default function ContactPage() {
  return (
    <MasterContentProvider slug="contact">
      <div>
        <SectionRenderer sections={[]} />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
          <p className="text-gray-600">Get in touch with us for more information about our services.</p>
        </div>
      </div>
    </MasterContentProvider>
  );
}
