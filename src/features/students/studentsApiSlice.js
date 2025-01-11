import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const studentAdapter = createEntityAdapter();
const initialState = studentAdapter.getInitialState();

const studentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: (classId) => {
        const params = classId ? { class_id: classId } : {}
        return {
          url: "students",
          params
        }
      },
      transformResponse: (responseData) => {
        return studentAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Student", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Student", id })),
          ];
        } else return { type: "Student", id: "LIST" };
      },
    }),
    addNewStudent: builder.mutation({
      query: (initialStudent) => ({
        url: "",
        method: "POST",
        body: {
          ...initialStudent,
        },
      }),
      invalidatesTags: [{ type: "Student", id: "LIST" }],
    }),
    updateStudent: builder.mutation({
      query: (initialStudent) => ({
        url: "",
        method: "PATCH",
        body: {
          ...initialStudent,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Student", id: arg.id },
      ],
    }),
    deleteStudent: builder.mutation({
      query: () => ({
        url: "",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Student", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useAddNewStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApiSlice;

const selectStudentsResult = studentApiSlice.endpoints.getStudents.select();

const selectStudentsData = createSelector(
  selectStudentsResult,
  (studentsResult) => studentsResult.data
);

export const { selectAll } = studentAdapter.getSelectors(
  (state) => selectStudentsData(state) ?? initialState
);
