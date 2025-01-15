import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const noteAdapter = createEntityAdapter();
const initialState = noteAdapter.getInitialState();

const subjectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: (outlineId) => ({
        url: "/notes",
        params: { outline_id: outlineId },
      }),
      transformResponse: (responseData) => {
        noteAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Note", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Note", id })),
          ];
        } else return { type: "Note", id: "LIST" };
      },
    }),
    addNewNote: builder.mutation({
      query: (noteData) => ({
        url: "notes",
        method: "POST",
        body: { ...noteData },
      }),
      invalidatesTags: [{ type: "Note", id: "LIST" }],
    }),
    updateNote: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/notes/${id}`,
        method: "PUT",
        body: { ...rest },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Outline", id: arg.id },
      ],
    }),
    deleteNote: builder.mutation({
      query: ({ id }) => ({
        url: `/notes/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Outline", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useAddNewNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = subjectsApiSlice;
