import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const outlineAdapter = createEntityAdapter();
const initialState = outlineAdapter.getInitialState();

const outlinesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOutlines: builder.query({
      query: ({ class_id, subject_id }) => ({
        url: "outlines",
        params: { class_id, subject_id },
      }),
      transformResponse: (responseData) => {
        return outlineAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Outline', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Outline', id })),
          ];
        }
        return [{ type: 'Outline', id: 'LIST' }];
      },
    }),
    updateOutline: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/outlines/${id}`,
        method: "PUT",
        body: { ...rest },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Outline", id: arg.id },
        { type: "Outline", id: "LIST" }
      ],
    }),
    addNewOutline: builder.mutation({
      query: (outlineData) => ({
        url: "outlines",
        method: "POST",
        body: { ...outlineData },
      }),
      invalidatesTags: [{ type: "Outline", id: "LIST" }],
    }),
    deleteOutline: builder.mutation({
      query: ({ id }) => ({
        url: `/outlines/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Outline", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetOutlinesQuery,
  useAddNewOutlineMutation,
  useUpdateOutlineMutation,
  useDeleteOutlineMutation,
} = outlinesApiSlice;
