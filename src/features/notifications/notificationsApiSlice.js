import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const notificationAdapter = createEntityAdapter()
const initialState = notificationAdapter.getInitialState()

const notificationsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNotifications: builder.query({
            query: () => `notifications`,
            transformResponse: (responseData) => notificationAdapter.setAll(initialState, responseData),
            providesTags: (result, error, arg) => [
                { type: 'Notification', id: 'LIST' }
            ],
            async onCacheEntryAdded(arg, lifecycleApi) {
                // create a websocket connection when the cache subscription starts
                const ws = new WebSocket('ws://localhost/notifications/')
                try {
                  // wait for the initial query to resolve before proceeding
                  await lifecycleApi.cacheDataLoaded
        
                  // when data is received from the socket connection to the server,
                  // update our query result with the received message
                  const listener = (event) => {
                    const message = JSON.parse(event.data)
                    switch (message.type) {
                      case 'notifications': {
                        lifecycleApi.updateCachedData(draft => {
                          // Insert all received notifications from the websocket
                          // into the existing RTKQ cache array
                          draft.push(message.payload)
                          draft.sort((a, b) => b.date.localeCompare(a.date))
                        })

                        break
                      }
                      default:
                        break
                    }
                  }
        
                  ws.addEventListener('message', listener)
                } catch {
                  // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
                  // in which case `cacheDataLoaded` will throw
                }
                // cacheEntryRemoved will resolve when the cache subscription is no longer active
                await lifecycleApi.cacheEntryRemoved
                // perform cleanup steps once the `cacheEntryRemoved` promise resolves
                ws.close()
              }
        }),
        markRead: builder.mutation({
            query: (notificationIds) => ({
                url: `notifications`,
                method: "POST",
                body: {ids: notificationIds}
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Notification', id: 'LIST' }
            ],
        })
    })
})

export const { useGetNotificationsQuery, useMarkReadMutation } = notificationsApiSlice

