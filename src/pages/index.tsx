import Layout from '@/layouts/Layout';

import bg from '@/assets/pexels-tara-winstead-7723393.jpg';
import Image from 'next/image';

export default function Home() {
  return (
    <Layout
      seo={{
        title: 'Molecule Viewer',
        description:
          'View and manipulate 3D models of molecules and compounds, allowing you to gain a better understanding of their structure, properties, and interactions.',
      }}
      kind="full"
    >
      <div className="relative h-full">
        <Image
          src={bg}
          alt="Molecule background picture"
          className="-z-10 object-cover blur-sm"
          placeholder="blur"
          priority
          fill
        />
        <div className="hero min-h-full bg-base-200/50 dark:bg-base-200/95">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Molecule viewer</h1>
              <p className="py-6">
                View and manipulate 3D models of molecules and compounds,
                allowing you to gain a better understanding of their structure,
                properties, and interactions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
