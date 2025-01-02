import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const courseAdapter = createEntityAdapter();
const initialState = courseAdapter.getInitialState();

const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: (arg) => ({
        url: "/courses",
        params: arg?.class_id ? { class_id: arg.class_id } : { creator_id: arg.creator_id} 
      }),
      transformResponse: (responseData) => {
        return courseAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Course", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Course", id })),
          ];
        } else return { type: "Course", id: "LIST" };
      },
    }),
    addNewCourse: builder.mutation({
      query: (initialCourse) => ({
        url: "/courses",
        method: "POST",
        body: {
          ...initialCourse,
        },
      }),
      invalidatesTags: [{ type: "Course", id: "LIST" }],
    }),
    updateCourse: builder.mutation({
      query: ({ id, ...rest}) => ({
        url: `/courses/${id}`,
        method: "PATCH",
        body: {
          ...rest,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Course", id: arg.id },
      ],
    }),
    deleteCourse: builder.mutation({
      query: ({ id }) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Course", id: arg.id },
      ],
    }),
  }),
});

export const {
    useGetCoursesQuery,
    useAddNewCourseMutation,
    useUpdateCourseMutation,
    useDeleteCourseMutation,
} = courseApiSlice;

const selectCoursesResult =
  courseApiSlice.endpoints.getCourses.select();

const selectCoursesData = createSelector(
  selectCoursesResult,
  (coursesResult) => coursesResult.data
);

export const { 
    selectAll 
} = courseAdapter.getSelectors(
  (state) => selectCoursesData(state) ?? initialState
);


