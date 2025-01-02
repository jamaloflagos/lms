import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const classAdapter = createEntityAdapter();
const initialState = classAdapter.getInitialState();

const classApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClasses: builder.query({
      query: () => "/classes",
      transformResponse: (responseData) => {
        return classAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Class", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Class", id })),
          ];
        } else return { type: "Class", id: "LIST" };
      },
    }),
    addNewClass: builder.mutation({
      query: (initialClass) => {
        console.log(initialClass)
        return {
          url: "/classes",
          method: "POST",
          body: {
            ...initialClass,
          },
        }
      },
      invalidatesTags: [{ type: "Class", id: "LIST" }],
    }),
    updateClass: builder.mutation({
      query: ({ id, ...rest}) => ({
        url: `/classes/${id}`,
        method: "PATCH",
        body: {
          ...rest,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Class", id: arg.id },
      ],
    }),
    deleteClass: builder.mutation({
      query: ({id}) => ({
        url: `/classes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Class", id: arg.id },
      ],
    }),
  }),
});

export const {
    useGetClassesQuery,
    useAddNewClassMutation,
    useUpdateClassMutation,
    useDeleteClassMutation,
} = classApiSlice;

const selectClassesResult =
  classApiSlice.endpoints.getClasses.select();

const selectClassesData = createSelector(
  selectClassesResult,
  (classesResult) => classesResult.data
);

export const { 
    selectAll 
} = classAdapter.getSelectors(
  (state) => selectClassesData(state) ?? initialState
);


