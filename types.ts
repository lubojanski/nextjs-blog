export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  categories: number[] | string[];
}
export interface Category {
  id: number;
  name: string;
  slug: string;
}
export interface PostsAndCategories {
  posts: Post[];
  categories: Category[];
}
export interface Pagination {
  hasPrev: boolean;
  hasNext: boolean;
}

export type BlogAPIRes = PostsAndCategories & { pagination: Pagination };

export enum SearchProp {
  Limit = "limit",
  Offset = "offset",
  Search = "search",
  PerPage = "perPage",
}
