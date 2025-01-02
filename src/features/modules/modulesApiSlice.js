import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const moduleAdapter = createEntityAdapter();
const initialState = moduleAdapter.getInitialState();

const moduleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getModules: builder.query({
      query: ({ course_id, class_id}) => ({
        url: "/modules", 
        params: { course_id, class_id}
      }),
      transformResponse: (responseData) => {
        return moduleAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Module", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Module", id })),
          ];
        } else return { type: "Module", id: "LIST" };
      },
    }),
    addNewModule: builder.mutation({
      query: (initialModule) => ({
        url: "/modules",
        method: "POST",
        body: {
          ...initialModule,
        },
      }),
      invalidatesTags: [{ type: "Module", id: "LIST" }],
    }),
    updateModule: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `modules/${id}`,
        method: "PATCH",
        body: {
          ...rest,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Module", id: arg.id },
      ],
    }),
    deleteModule: builder.mutation({
      query: ({ id }) => ({
        url: `modules/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Module", id: arg.id },
      ],
    }),
  }),
});

export const {
    useGetModulesQuery,
    useAddNewModuleMutation,
    useUpdateModuleMutation,
    useDeleteModuleMutation,
} = moduleApiSlice;

const selectModulesResult =
  moduleApiSlice.endpoints.getModules.select();

const selectModulesData = createSelector(
  selectModulesResult,
  (modulesResult) => modulesResult.data
);

export const { 
    selectAll 
} = moduleAdapter.getSelectors(
  (state) => selectModulesData(state) ?? initialState
);


