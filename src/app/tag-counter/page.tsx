"use client";

import React from "react";
import FileUploader from "./components/FileUploader";
import Settings from "./components/Settings";
import Instructions from "./components/Instructions";
import { processCSV, generateCSV } from "./logic/csv-helper";
import { AnalysisResult } from "./types";

export default function TagCounterPage() {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [analysisResult, setAnalysisResult] =
    React.useState<AnalysisResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setAnalysisResult(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await processCSV(selectedFile);
      setAnalysisResult(result);

      // Generate and download CSV
      const csvContent = generateCSV(result);
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `tag_analysis_${
        new Date().toISOString().split("T")[0]
      }.csv`;
      link.click();
    } catch (error) {
      console.error("Error analyzing file:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to analyze the file. Please check the file format and try again."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Tag Counter</h2>
        <p className="mt-2 text-gray-600">
          Upload your CSV file to analyze and count tags.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content area */}
        <div className="lg:col-span-2 space-y-6">
          <Instructions />

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              File Upload
            </h3>
            <FileUploader onFileSelect={handleFileSelect} />
            {selectedFile && (
              <p className="mt-4 text-sm text-gray-600">
                Selected file: {selectedFile.name}
              </p>
            )}
            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
          </div>

          {analysisResult && (
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Analysis Results
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Total Tags</p>
                    <p className="text-lg font-semibold">
                      {analysisResult.totalTags}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Unique Tags</p>
                    <p className="text-lg font-semibold">
                      {analysisResult.uniqueTags}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Date Range</p>
                  <p className="text-sm">{analysisResult.dateRange}</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tag
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Count
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {analysisResult.tagCounts.map(({ tag, count }) => (
                        <tr key={tag}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {tag}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {count}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Settings sidebar */}
        <Settings
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
          isFileSelected={!!selectedFile}
        />
      </div>
    </div>
  );
}
