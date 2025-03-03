export interface TagCount {
  tag: string;
  count: number;
}

export interface AnalysisResult {
  tagCounts: TagCount[];
  totalTags: number;
  uniqueTags: number;
  dateRange: string;
}
