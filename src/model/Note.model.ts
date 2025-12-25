export interface Note {
  id: string;
  content: string;
  leadId: string;
  description: string;
  parentNoteId: string;
  createdAt: string;
  updatedAt: string;
}

// export interface TagsResponse {
//   data: Tag[];
//   count: number;
//   total: number;
//   page: number;
//   pageCount: number;
// }
