// Writers
export interface Writer {
  avatar: string;
  averageScore: number;
  bio: string;
  createdAt: string;
  name: string;
  updatedAt: string;
  username: string;
  _id: string;
}

export interface TopWriters {
  topWriters: Writer[];
}

export interface AllWriters {
  allWriters: Writer[];
}

// Single Writer
export interface SingleWriter {
  avatar: string;
  averageScore: number;
  bio: string;
  blogs: Blog[];
  createdAt: string;
  name: string;
  updatedAt: string;
  username: string;
  _id: string;
  msg?: string;
}

export interface CurrentUser {
  _id?: string | undefined;
  name?: string | undefined;
  avatar?: string | null | ArrayBuffer;
  bio?: string | undefined;
  msg?: string;
}

export interface SingleWriterObj {
  singleWriter: SingleWriter;
}

export interface BlogsByWriter {
  blogsByWriter: SingleBlog[];
}

export interface SingleWriterProps {
  singleWriter: SingleWriter;
  blogsByWriter: SingleBlog[];
}

// Blogs
export interface Blog {
  averageScore: number;
  content: string;
  createdAt: string;
  creator: Creator;
  creatorId: string;
  imgurl: string;
  rateCount: number;
  title: string;
  updatedAt: string;
  _id: string;
}

export interface Creator {
  avatar: string;
  averageScore: number;
  bio: string;
  blogs: string[];
  createdAt: string;
  name: string;
  updatedAt: string;
  username: string;
  _id: string;
}

export interface TopBlogs {
  topBlogs: Blog[];
}

export interface AllBlogs {
  allBlogs: Blog[];
}

// Single Blog
export interface SingleBlog {
  averageScore: number;
  content: string;
  createdAt: string;
  creatorId: string;
  creator?: Creator | undefined;
  imgurl: string;
  rateCount: number;
  title: string;
  updatedAt: string;
  _id: string;
  msg?: string;
}

export interface SingleBlogObj {
  singleBlog: SingleBlog;
}

export interface BlogInfo {
  _id?: string | string[] | undefined;
  title?: string;
  imgUrl?: string;
  content?: string;
  msg?: string;
}

// Register
export interface RegisterInfo {
  msg: string;
}

// Comments
export interface Comment {
  createdAt?: string;
  text?: string;
  user?: Creator;
  userId?: string;
  _id?: string;
}

export interface InputInfoObj {
  value: string;
  error: boolean;
  errorMessage: string;
}

export interface RegInfo {
  name: InputInfoObj;
  username: InputInfoObj;
}

export interface LoginInfo {
  username: InputInfoObj;
  password: InputInfoObj;
}