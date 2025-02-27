import { TopicCategory } from "../interfaces/interfaces";

export const getElapsedTime = (postedDate: string): string => {
  const now = new Date(); // Current date and time
  const posted = new Date(postedDate); // Parse the posted date
  const elapsedMs = now.getTime() - posted.getTime(); // Time difference in milliseconds

  const elapsedHours = elapsedMs / (1000 * 60 * 60); // Convert to hours
  if (elapsedHours > 24) {
    const elapsedDays = Math.floor(elapsedHours / 24); // Convert to days
    return `${elapsedDays} day${elapsedDays > 1 ? "s" : ""} ago`;
  }

  return `${Math.floor(elapsedHours)} hour${
    Math.floor(elapsedHours) !== 1 ? "s" : ""
  } ago`;
};

export function formatNumber(value: number) {
  if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (value >= 1_000) {
    return (value / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return value?.toString(); // Return the number as-is if it's less than 1,000
}
export function getTopicCategoryString(category: TopicCategory): string {
  switch (category) {
    case TopicCategory.Technology:
      return "Technology";
    case TopicCategory.Entertainment:
      return "Entertainment";
    case TopicCategory.Science:
      return "Science";
    case TopicCategory.Lifestyle:
      return "Lifestyle";
    case TopicCategory.Politics:
      return "Politics";
    case TopicCategory.Business_Finance:
      return "Business & Finance";
    case TopicCategory.Education:
      return "Education";
    case TopicCategory.Sports:
      return "Sports";
    case TopicCategory.Art_Creativity:
      return "Art & Creativity";
    case TopicCategory.Social_Issues:
      return "Social Issues";
    case TopicCategory.History_Culture:
      return "History & Culture";
    case TopicCategory.Philosophy_Thought:
      return "Philosophy & Thought";
    case TopicCategory.Hobbies_Interests:
      return "Hobbies & Interests";
    case TopicCategory.Technology_Support:
      return "Technology Support";
    case TopicCategory.Miscellaneous:
      return "Miscellaneous";
    default:
      return "Unknown Category";
  }
}
