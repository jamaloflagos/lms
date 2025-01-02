import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const attendanceAdapter = createEntityAdapter();
const initialState = attendanceAdapter.getInitialState();

const attendanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAttendances: builder.query({
      query: () => ({
        url: "",
      }),
      transformResponse: (responseData) => {
        return attendanceAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Attendance", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Attendance", id })),
          ];
        } else return { type: "Attendance", id: "LIST" };
      },
    }),
    addNewAttendance: builder.mutation({
      query: (initialAttendace) => ({
        url: "",
        method: "POST",
        body: {
          ...initialAttendace,
        },
      }),
      invalidatesTags: [{ type: "Attendance", id: "LIST" }],
    }),
    updateAttendance: builder.mutation({
      query: (initialAttendance) => ({
        url: "",
        method: "PATCH",
        body: {
          ...initialAttendance,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Attendance", id: arg.id },
      ],
    }),
    deleteAttendance: builder.mutation({
      query: () => ({
        url: "",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Attendance", id: arg.id },
      ],
    }),
  }),
});

export const {
    useGetAttendancesQuery,
    useAddNewAttendanceMutation,
    useUpdateAttendanceMutation,
    useDeleteAttendanceMutation,
} = attendanceApiSlice;

const selectAttendancesResult =
  attendanceApiSlice.endpoints.getAttendances.select();

const selectAttendancesData = createSelector(
  selectAttendancesResult,
  (attendancesResult) => attendancesResult.data
);

export const { 
    selectAll 
} = attendanceAdapter.getSelectors(
  (state) => selectAttendancesData(state) ?? initialState
);


