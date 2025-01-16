import { createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { forceGenerateNotifications } from "../../app/api/server";

const metadataAdapter = createEntityAdapter()
const initialState = metadataAdapter.getInitialState()

const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        allNotificationsRead: (state) => {
            Object.values(state.entities).forEach(metadata => {
                metadata.read = true
              })
        }
    },
    extraReducers(builder) {
        builder.addMatcher(
          apiSlice.endpoints.getNotifications.matchFulfilled,
          (state, action) => {
            const notificationsMetadata =
              action.payload.map(notification => ({
                id: notification.id,
                read: false,
                isNew: true
              }))
    
            Object.values(state.entities).forEach(metadata => {
              metadata.isNew = !metadata.read
            })
    
            metadataAdapter.upsertMany(state, notificationsMetadata)
          }
        )
      }
})

export const { allNotificationsRead } = notificationsSlice.actions

export default notificationsSlice.reducer

export const {
    selectAll: selectAllNotificationsMetadata,
    selectEntities: selectMetadataEntities
  } = metadataAdapter.getSelectors(
    (state) => state.notifications
  )
  
  export const selectUnreadNotificationsCount = (state) => {
    const allMetadata = selectAllNotificationsMetadata(state)
    const unreadNotifications = allMetadata.filter(metadata => !metadata.read)
    return unreadNotifications.length
  }

const emptyNotifications = []

export const selectNotificationsResult =
  apiSlice.endpoints.getNotifications.select()

const selectNotificationsData = createSelector(
  selectNotificationsResult,
  notificationsResult => notificationsResult.data ?? emptyNotifications
)

export const fetchNotificationsWebsocket =
  () => (dispatch, getState) => {
    const allNotifications = selectNotificationsData(getState())
    const [latestNotification] = allNotifications
    const latestTimestamp = latestNotification?.date ?? ''

    forceGenerateNotifications(latestTimestamp)
  }