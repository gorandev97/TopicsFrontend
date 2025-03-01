export interface Topic {
  id: string;
  title: string;
  description: string;
  postedBy: string;
  dislikesCount: number;
  likesCount: number;
  createdAt: string;
  updatedAt: string;
  image?: string;

  author: User;
  category: TopicCategory;

  comments: Comment[];
  likes: Like[];
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImage: string;
  topics: Topic[];
  comments: Comment[];
  likes: Like[];
  notifications: Notification[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  content: string;
  topicId: string;
  postedBy: string;
  dislikesCount: number;
  likesCount: number;
  createdAt: string;
  updatedAt: string;
  topic: Topic;
  author: User;
  likes: Like[];
  replies: Comment[];
  parentCommentId?: string;
}

export interface Like {
  id: string;
  userId: string;
  topicId?: string;
  commentId?: string;
  createdAt: string;
  updatedAt: string;

  user: User;
  topic?: Topic;
  comment?: Comment;
}

export interface Notification {
  id: string;
  userId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  topicId: string;
  user: User;
}
export enum TopicCategory {
  Technology = "Technology",
  Entertainment = "Entertainment",
  Science = "Science",
  Lifestyle = "Lifestyle",
  Politics = "Politics",
  Business_Finance = "Business_Finance",
  Education = "Education",
  Sports = "Sports",
  Art_Creativity = "Art_Creativity",
  Social_Issues = "Social_Issues",
  History_Culture = "History_Culture",
  Philosophy_Thought = "Philosophy_Thought",
  Hobbies_Interests = "Hobbies_Interests",
  Technology_Support = "Technology_Support",
  Miscellaneous = "Miscellaneous",
}
