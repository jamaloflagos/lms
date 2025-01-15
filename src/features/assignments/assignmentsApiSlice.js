import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const assignmentAdapter = createEntityAdapter();
const initialState = assignmentAdapter.getInitialState();

const assignmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query({
      query: ({ class_id, subject_id }) => ({
        url: "assignments",
        params: { class_id, subject_id },
      }),
      transformResponse: (responseData) => assignmentAdapter.setAll(initialState, responseData),
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Assignment", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Assignment", id })),
          ];
        } else return { type: "Assignment", id: "LIST" };
      },
    }),
    addNewAssignment: builder.mutation({
      query: (testData) => ({
        url: "assignments",
        method: "POST",
        body: { ...testData },
      }),
      invalidatesTags: [{ type: "Assignment", id: "LIST" }],
    }),
    updateAssignment: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `assignmentss/${id}`,
        method: "PUT",
        body: { ...rest },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Assignment", id: arg.id }],
    }),
    deleteAssignment: builder.mutation({
      query: ({ id }) => ({
        url: `assignments/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Assignment", id: arg.id }],
    }),
  }),
});

export const {
  useGetAssignmentsQuery,
  useAddNewAssignmentMutation,
  useUpdateAssignmentMutation,
  useDeleteAssignmentMutation,
} = assignmentApiSlice;
