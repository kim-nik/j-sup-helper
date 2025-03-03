import { TagCount, AnalysisResult } from "../types";
import { getPreviousWeekRange } from "./date-helpers";

export const processCSV = async (file: File): Promise<AnalysisResult> => {
  const tags: string[] = [];
  const text = await file.text();
  const lines = text.split("\n").filter((line) => line.trim());

  if (lines.length < 2) {
    throw new Error("File is empty or contains only headers");
  }

  // Process data rows (skip header)
  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(";");
    if (row.length < 16) continue; // Skip invalid rows

    const tagData = row[15]; // Tags are in the last column (index 15)
    if (tagData) {
      // Split by comma if multiple tags
      const tagList = tagData.split(",").map((tag) => tag.trim());

      for (const tag of tagList) {
        if (tag) {
          // Remove quotes if present and clean the tag
          let cleanTag = tag.replace(/^["']|["']$/g, "").trim();
          // Remove "эль" or "Эль" prefix and trim spaces
          cleanTag = cleanTag.replace(/^[Ээ]ль\s+/i, "").trim();

          if (cleanTag) {
            // Capitalize first letter
            cleanTag = cleanTag.charAt(0).toUpperCase() + cleanTag.slice(1);
            tags.push(cleanTag);
          }
        }
      }
    }
  }

  if (tags.length === 0) {
    throw new Error("No valid tags found in the file");
  }

  const tagCounts: Record<string, number> = {};
  tags.forEach((tag) => {
    if (tag) {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    }
  });

  const sortedTagCounts: TagCount[] = Object.entries(tagCounts)
    .map(([tag, count]) => ({
      tag,
      count,
    }))
    .sort((a, b) => b.count - a.count);

  const dateRange = getPreviousWeekRange();

  return {
    tagCounts: sortedTagCounts,
    totalTags: tags.length,
    uniqueTags: Object.keys(tagCounts).length,
    dateRange: dateRange.formatDateRange(),
  };
};

export const generateCSV = (result: AnalysisResult): string => {
  let outputData = "Вопрос,Вопрос пользователя,Количество,Date\n";

  result.tagCounts.forEach(({ tag, count }) => {
    // Escape quotes in tags and wrap in quotes
    const escapedTag = tag.replace(/"/g, '""');
    // Same tag appears in both first and second columns
    outputData += `"${escapedTag}","${escapedTag}",${count},"${result.dateRange}"\n`;
  });

  return outputData;
};
