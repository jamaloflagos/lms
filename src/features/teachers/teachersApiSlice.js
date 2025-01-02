import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const teacherAdapter = createEntityAdapter();
const initialState = teacherAdapter.getInitialState();

const teacherApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeachers: builder.query({
      query: () => "/teachers",
      transformResponse: (responseData) => {
        return teacherAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Teacher", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Teacher", id })),
          ];
        } else return { type: "Teacher", id: "LIST" };
      },
    }),
    addNewTeacher: builder.mutation({
      query: (initialTeacher) => {
          console.log(initialTeacher)

          return {
            url: "/teachers",
            method: "POST",
            body: {
              ...initialTeacher,
            },
          }
      },
      invalidatesTags: [{ type: "Teacher", id: "LIST" }],
    }),
    updateTeacher: builder.mutation({
      query: ({ id, ...rest}) => ({
        url: `/teachers/${id}`,
        method: "PATCH",
        body: {
          ...rest,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Teacher", id: arg.id },
      ],
    }),
    deleteTeacher: builder.mutation({
      query: ({ id }) => ({
        url: `/teachers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Teacher", id: arg.id },
      ],
    }),
  }),
});

export const {
    useGetTeachersQuery,
    useAddNewTeacherMutation,
    useUpdateTeacherMutation,
    useDeleteTeacherMutation,
} = teacherApiSlice;

const selectTeachersResult =
  teacherApiSlice.endpoints.getTeachers.select();

const selectTeachersData = createSelector(
  selectTeachersResult,
  (teachersResult) => teachersResult.data
);

export const { 
    selectAll 
} = teacherAdapter.getSelectors(
  (state) => selectTeachersData(state) ?? initialState
);