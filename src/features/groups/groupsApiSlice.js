import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const groupAdapter = createEntityAdapter();
const groupInitialState = groupAdapter.getInitialState();


const groupApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGroups: builder.query({
      query: (student_id) => ({
        url: "/groups",
        params: {student_id}
      }),
      transformResponse: (responseData) => {
        return groupAdapter.setAll(groupInitialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Group", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Group", id })),
          ];
        } else return { type: "Group", id: "LIST" };
      },
    }),
    getMembers: builder.query({
      query: ({ id }) => ({
        url: `/groups/${id}`,
        params: { data: 'members' }
      }),
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Member", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Member", id })),
          ];
        } else return { type: "Member", id: "LIST" };
      },
    }),
    getMessages: builder.query({
      query: ({ id }) => ({
        url: `/groups/${id}`,
        params: { data: 'messages' }
      }),
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Message", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Message", id })),
          ];
        } else return { type: "Message", id: "LIST" };
      },
    }),
    addNewGroup: builder.mutation({
      query: (initialGroup) => {
        console.log('====================================');
        console.log(initialGroup);
        console.log('====================================');
        return {
          url: "/groups",
          method: "POST",
          body: {
            ...initialGroup,
          },
        }
      },
      invalidatesTags: [{ type: "Group", id: "LIST" }],
    }),
    updateGroup: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/groups/${id}`,
        method: "UPDATE",
        body: {
          ...rest,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Group", id: arg.id },
      ],
    }),
    deleteGroup: builder.mutation({
      query: ({ id }) => ({
        url: `/groups/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Group", id: arg.id },
      ],
    }),
  }),
});

export const {
    useGetGroupsQuery,
    useAddNewGroupMutation,
    useUpdateGroupMutation,
    useDeleteGroupMutation,
} = groupApiSlice;

const selectGroupsResult =
  groupApiSlice.endpoints.getGroups.select();

const selectGroupsData = createSelector(
  selectGroupsResult,
  (groupsResult) => groupsResult.data
);

export const { 
    selectAll 
} = groupAdapter.getSelectors(
  (state) => selectGroupsData(state) ?? groupInitialState
);


