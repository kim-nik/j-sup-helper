export default function Instructions() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Instructions</h3>
      <div className="prose prose-sm text-gray-600">
        <p>
          This tool helps you analyze HTML files by counting and categorizing
          HTML tags. Simply upload your HTML file, configure the analysis
          settings, and click &ldquo;Analyze Tags&rdquo;.
        </p>
        <ul className="mt-2">
          <li>Supported formats: HTML, HTM, TXT</li>
          <li>Maximum file size: 10MB</li>
          <li>Analysis includes tag counts and nesting levels</li>
        </ul>
      </div>
    </div>
  );
}
