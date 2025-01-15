import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const examAdapter = createEntityAdapter();
const initialState = examAdapter.getInitialState();

const examApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExams: builder.query({
      query: ({ class_id, subject_id }) => ({
        url: "exams",
        params: { class_id, subject_id },
      }),
      transformResponse: (responseData) => examAdapter.setAll(initialState, responseData),
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Exam", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Test", id })),
          ];
        } else return { type: "Exam", id: "LIST" };
      },
    }),
    addNewExam: builder.mutation({
      query: (testData) => ({
        url: "exams",
        method: "POST",
        body: { ...testData },
      }),
      invalidatesTags: [{ type: "Exam", id: "LIST" }],
    }),
    updateExam: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `exams/${id}`,
        method: "PUT",
        body: { ...rest },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Exam", id: arg.id }],
    }),
    deleteExam: builder.mutation({
      query: ({ id }) => ({
        url: `exams/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Exam", id: arg.id }],
    }),
  }),
});

export const {
  useGetExamsQuery,
  useAddNewExamMutation,
  useUpdateExamMutation,
  useDeleteExamMutation,
} = examApiSlice;
