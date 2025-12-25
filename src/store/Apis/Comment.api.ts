import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "./Auth.api";

interface Comment {
  id: number;
  content: string;
  fileId: number;
  file: File;
}

export const commentSlice = createApi({
  reducerPath: "comments",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getComemntByOrderId: builder.query<Comment[], string>({
        query: (id) => {
          return {
            url: "/comments/order/" + id,
          };
        },
      }),
    createComment: builder.mutation<Comment, { id: string; data: Comment }>({
      query: ({ id, data }) => {
        return {
          url: "/comments/order/" + id,
          method: "POST",
          body: data,
        };
      },
    }),
    deleteComment: builder.mutation<Comment, { id: string | number }>({
      query: ({id}) => {
              return {
                url: "/comments/" + id,
              method: "DELETE",
        };
      },
    }),
  }),
});

export const {
    useGetComemntByOrderIdQuery,
    useCreateCommentMutation,
    useDeleteCommentMutation,
} = commentSlice;
