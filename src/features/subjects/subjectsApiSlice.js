import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const subjectAdapter = createEntityAdapter();
const initialState = subjectAdapter.getInitialState();

const subjectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubjects: builder.query({
      query: (arg) => {
        let params;
        if (arg) {
          const { subjectFilter: filter } = arg;
          const { class_id, teacher_id } = filter;
          if (class_id) {
            params = { class_id };
          } else if (teacher_id) {
            params = { teacher_id };
          }
        } else {
          params = {};
        }
        return {
          url: "/subjects",
          params,
        };
      },
      transformResponse: (responseData, meta, arg) => {
        console.log('====================================');
        console.log(responseData);
        console.log('====================================');
        let modifiedData;
        if (arg) {
          const { status } = arg;
          modifiedData =
            status === "Teacher"
              ? responseData.map((item) => ({
                  ...item,
                  id: `${item.class_id}_${item.subject_id}`,
                }))
              : responseData;
        } else modifiedData = responseData
        
        return subjectAdapter.setAll(initialState, modifiedData);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Subject", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Subject", id })),
          ];
        } else return { type: "Subject", id: "LIST" };
      },
    }),
  }),
});

export const {
  useGetSubjectsQuery,
} = subjectsApiSlice;
