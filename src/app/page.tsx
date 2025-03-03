import MainLayout from "@/components/layout/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Welcome to Data Analysis Dashboard
          </h2>
          <p className="text-gray-600">
            This dashboard will help you analyze and visualize your data
            effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder for data cards */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Data Overview
            </h3>
            <p className="text-gray-600">Upload your data to get started</p>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Analysis Results
            </h3>
            <p className="text-gray-600">View your analysis results here</p>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Visualizations
            </h3>
            <p className="text-gray-600">
              Your data visualizations will appear here
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
