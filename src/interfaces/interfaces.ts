export interface Topic {
  id: string; // Topic ID
  title: string; // Topic title
  description: string; // Topic description
  postedBy: string; // Foreign key referencing User
  dislikesCount: number;
  likesCount: number; // Number of likes
  createdAt: string; // Date the topic was created
  updatedAt: string; // Date the topic was last updated

  // Foreign key relationship with User (author of the topic)
  author: User; // Author is of type User (represented by the User model)

  // Related records
  comments: Comment[]; // Array of related Comment objects
  likes: Like[]; // Array of related Like objects
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImage: string;
  topics: Topic[]; // Array of topics authored by the user
  comments: Comment[]; // Array of comments made by the user
  likes: Like[]; // Array of likes made by the user
  notifications: Notification[]; // Array of notifications for the user
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  content: string;
  topicId: string; // Foreign key referencing Topic
  postedBy: string; // Foreign key referencing User
  dislikesCount: number;
  likesCount: number;
  createdAt: string;
  updatedAt: string;
  topic: Topic; // Related topic (foreign key relation)
  author: User; // Author (foreign key relation)
  likes: Like[]; // Likes related to the comment
  replies: Comment[]; // Replies to the comment
  parentCommentId?: string; // Foreign key referencing Comment (optional)
}

export interface Like {
  id: string;
  userId: string; // Foreign key referencing User
  topicId?: string; // Foreign key referencing Topic (optional, as it can also be a comment like)
  commentId?: string; // Foreign key referencing Comment (optional)
  createdAt: string;
  updatedAt: string;

  user: User; // User who liked the topic or comment
  topic?: Topic; // Related topic (if the like is on a topic)
  comment?: Comment; // Related comment (if the like is on a comment)
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
