import { DataPoint, AnalysisResult } from "@/types/analysis";

export function calculateSummary(data: DataPoint[]): AnalysisResult["summary"] {
  const values = data.map((point) => point.value);
  const sum = values.reduce((acc, val) => acc + val, 0);
  const mean = sum / values.length;

  const sortedValues = [...values].sort((a, b) => a - b);
  const median = sortedValues[Math.floor(sortedValues.length / 2)];

  const min = Math.min(...values);
  const max = Math.max(...values);

  const variance =
    values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) /
    values.length;
  const standardDeviation = Math.sqrt(variance);

  return {
    mean,
    median,
    min,
    max,
    standardDeviation,
  };
}

export function filterDataByDateRange(
  data: DataPoint[],
  startDate: Date,
  endDate: Date
): DataPoint[] {
  return data.filter(
    (point) => point.timestamp >= startDate && point.timestamp <= endDate
  );
}

export function groupDataByCategory(
  data: DataPoint[]
): Record<string, DataPoint[]> {
  return data.reduce((acc, point) => {
    const category = point.category || "uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(point);
    return acc;
  }, {} as Record<string, DataPoint[]>);
}
