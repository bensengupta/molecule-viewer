import Layout from '@/layouts/Layout';

export default function Home() {
  return (
    <Layout title="Molecule Viewer" kind="full">
      <div className="hero min-h-full bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Molecule viewer</h1>
            <p className="py-6">
              View and manipulate 3D models of molecules and compounds, allowing
              you to gain a better understanding of their structure, properties,
              and interactions.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
