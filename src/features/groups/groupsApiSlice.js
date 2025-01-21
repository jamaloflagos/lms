import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const groupAdapter = createEntityAdapter();
const groupInitialState = groupAdapter.getInitialState();

const groupApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGroups: builder.query({
      query: (student_id) => ({
        url: "/groups",
        params: { student_id },
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
      query: (groupId) => ({
        url: `/groups/${groupId}`,
        params: { data: "members" },
      }),
    }),
    getMessages: builder.query({
      query: ({ groupId }) => ({
        url: `/groups/${groupId}/messages`,
        // params: { data: "messages" },
      }),
      providesTags: [{type: "Message", id: "LIST"}],
      onCacheEntryAdded: async (arg, lifecycleApi) => {
        const ws = new WebSocket(
          `ws://localhost/chat/${arg.groupName}`
        );
        try {
          await lifecycleApi.cacheDataLoaded;
          const listener = (event) => {
            const message = JSON.parse(event.data);
            switch (message.type) {
              case "chat_message": {
                lifecycleApi.updateCachedData((draft) => {
                  draft.push(message.payload);
                  draft.sort((a, b) => b.date.localeCompare(a.date));
                });

                break;
              }
              default:
                break;
            }
          };

          ws.addEventListener("message", listener);
        } catch (error) {}

        await lifecycleApi.cacheEntryRemoved;
        ws.close();
      },
    }),
    addNewGroup: builder.mutation({
      query: (initialGroup) => {
        return {
          url: "/groups",
          method: "POST",
          body: {
            ...initialGroup,
          },
        };
      },
      invalidatesTags: [{ type: "Group", id: "LIST" }],
    }),
    updateGroup: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/groups/${id}`,
        method: "PUT",
        body: {
          ...rest,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Group", id: arg.id },
        { type: "Group", id: "LIST" },
      ],
    }),
    deleteGroup: builder.mutation({
      query: ({ id }) => ({
        url: `/groups/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Group", id: arg.id }],
    }),
    addNewMessage: builder.mutation({
      query: (messageData) => ({
        url: "groups/messages",
        method: "POST",
        body: { ...messageData }
      }),
      invalidatesTags: [{type: "Message", id: "LIST"}]
    })
  }),
});

export const {
  useGetGroupsQuery,
  useAddNewGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
  useGetMessagesQuery,
  useAddNewMessageMutation
} = groupApiSlice;

const selectGroupsResult = groupApiSlice.endpoints.getGroups.select();

const selectGroupsData = createSelector(
  selectGroupsResult,
  (groupsResult) => groupsResult.data
);

export const { selectAll } = groupAdapter.getSelectors(
  (state) => selectGroupsData(state) ?? groupInitialState
);
