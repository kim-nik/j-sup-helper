"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

export default function FileUploader({ onFileSelect }: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragActive
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:border-gray-400"
      }`}
    >
      <input {...getInputProps()} />
      <div className="space-y-2">
        <div className="text-gray-600">
          {isDragActive ? (
            <p>Drop the CSV file here</p>
          ) : (
            <p>Drag and drop a CSV file here, or click to select</p>
          )}
        </div>
        <p className="text-sm text-gray-500">Only CSV files are accepted</p>
      </div>
    </div>
  );
}
