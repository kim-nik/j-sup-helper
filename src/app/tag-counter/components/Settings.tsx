"use client";

import React from "react";

interface SettingsProps {
  onAnalyze: () => void;
  isAnalyzing: boolean;
  isFileSelected: boolean;
}

export default function Settings({
  onAnalyze,
  isAnalyzing,
  isFileSelected,
}: SettingsProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Setting 1
            </label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Setting 2
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Enter value..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Setting 3
            </label>
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Enable option
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onAnalyze}
        disabled={!isFileSelected || isAnalyzing}
        className={`w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white
          ${
            !isFileSelected || isAnalyzing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          }`}
      >
        {isAnalyzing ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Analyzing...
          </>
        ) : (
          "Analyze Tags"
        )}
      </button>
    </div>
  );
}
