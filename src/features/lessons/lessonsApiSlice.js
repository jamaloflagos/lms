import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const lessonAdapter = createEntityAdapter();
const initialState = lessonAdapter.getInitialState();

const lessonApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLessons: builder.query({
      query: ({ class_id, course_id, module_id}) => ({
        url: "/lessons",
        params: { class_id, course_id, module_id }
      }),
      transformResponse: (responseData) => {
        return lessonAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Lesson", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Lesson", id })),
          ];
        } else return { type: "Lesson", id: "LIST" };
      },
    }),
    addNewLesson: builder.mutation({
      query: (initialLesson) => ({
        url: "",
        method: "POST",
        body: {
          ...initialLesson,
        },
      }),
      invalidatesTags: [{ type: "Lesson", id: "LIST" }],
    }),
    updateLesson: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/lessons/${id}`,
        method: "PATCH",
        body: {
          ...rest,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Lesson", id: arg.id },
      ],
    }),
    deleteLesson: builder.mutation({
      query: ({ id }) => ({
        url: `/lessons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Lesson", id: arg.id },
      ],
    }),
  }),
});

export const {
    useGetLessonsQuery,
    useAddNewLessonMutation,
    useUpdateLessonMutation,
    useDeleteLessonMutation,
} = lessonApiSlice;

const selectLessonsResult =
  lessonApiSlice.endpoints.getLessons.select();

const selectLessonsData = createSelector(
  selectLessonsResult,
  (lessonsResult) => lessonsResult.data
);

export const { 
    selectAll 
} = lessonAdapter.getSelectors(
  (state) => selectLessonsData(state) ?? initialState
);


