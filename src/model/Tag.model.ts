export interface Tag {
  id: string;
  name: string;
  slug: string;
  color: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  leadCount?: number;
}

export interface TagsResponse {
  data: Tag[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
}
