import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const testAdapter = createEntityAdapter();
const initialState = testAdapter.getInitialState();

const testApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTests: builder.query({
      query: ({ class_id, subject_id }) => {
        const params = subject_id ? { class_id, subject_id } : { class_id }
        return {
          url: "tests",
          params: params,
        }
      },
      transformResponse: (responseData) => testAdapter.setAll(initialState, responseData),
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Test", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Test", id })),
          ];
        } else return { type: "Test", id: "LIST" };
      },
    }),
    addNewTest: builder.mutation({
      query: (testData) => ({
        url: "tests",
        method: "POST",
        body: { ...testData },
      }),
      invalidatesTags: [{ type: "Test", id: "LIST" }],
    }),
    updateTest: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `tests/${id}`,
        method: "PUT",
        body: { ...rest },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Test", id: arg.id }],
    }),
    deleteTest: builder.mutation({
      query: ({ id }) => ({
        url: `tests/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Test", id: arg.id }],
    }),
  }),
});

export const {
  useGetTestsQuery,
  useAddNewTestMutation,
  useUpdateTestMutation,
  useDeleteTestMutation,
} = testApiSlice;
