export default function Debug() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Debug Test Page</h1>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Simple Test Page</h2>
          <p className="text-gray-300 mb-4">
            This is a simple test page to verify that basic routing works.
          </p>
          <div className="space-y-2">
            <p>✅ Page renders successfully</p>
            <p>✅ No complex components</p>
            <p>✅ No external dependencies</p>
            <p>✅ Basic HTML structure</p>
          </div>
        </div>
      </div>
    </div>
  );
}






