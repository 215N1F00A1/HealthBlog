export type User = {
  id: string;
  name: string;
  email: string;
  role: 'doctor' | 'patient';
};

export type Category = {
  id: string;
  name: string;
  description: string;
};

export type BlogPost = {
  id: string;
  title: string;
  imageUrl: string;
  category: Category;
  summary: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  isDraft: boolean;
};