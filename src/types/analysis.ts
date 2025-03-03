export interface DataPoint {
  id: string;
  timestamp: Date;
  value: number;
  category?: string;
  metadata?: Record<string, unknown>;
}

export interface AnalysisResult {
  id: string;
  name: string;
  description: string;
  data: DataPoint[];
  summary?: {
    mean: number;
    median: number;
    min: number;
    max: number;
    standardDeviation: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ChartConfig {
  type: "line" | "bar" | "scatter" | "pie";
  title: string;
  xAxis?: {
    label: string;
    type: "time" | "category" | "number";
  };
  yAxis?: {
    label: string;
    type: "number";
  };
  data: DataPoint[];
}
