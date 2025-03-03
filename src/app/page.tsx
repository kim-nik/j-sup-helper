import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Welcome to Data Analysis Dashboard
        </h2>
        <p className="mt-2 text-gray-600">
          Choose a tool from the navigation menu to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/tag-counter"
          className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-medium text-gray-900">Tag Counter</h3>
          <p className="mt-2 text-sm text-gray-600">
            Analyze and count HTML tags in your content.
          </p>
        </Link>

        <Link
          href="/data-analyzer"
          className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-medium text-gray-900">Data Analyzer</h3>
          <p className="mt-2 text-sm text-gray-600">
            Upload and analyze your data files.
          </p>
        </Link>

        <Link
          href="/chart-generator"
          className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-medium text-gray-900">Chart Generator</h3>
          <p className="mt-2 text-sm text-gray-600">
            Create beautiful charts from your data.
          </p>
        </Link>
      </div>
    </div>
  );
}
