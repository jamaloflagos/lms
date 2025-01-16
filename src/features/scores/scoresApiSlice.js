import { apiSlice } from "../../app/api/apiSlice";
// import { createEntityAdapter } from "@reduxjs/toolkit";

// const reportCardAdapter = createEntityAdapter()
// const reportCardInitialState = reportCardAdapter.getInitialState()

const scoreApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getScores: builder.query({
      query: ({ student_id, subject_id }) => ({
        url: "scores",
        params: { student_id, subject_id },
      }),
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Score", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Score", id })),
          ];
        } else return { type: "Score", id: "LIST" };
      },
    }),
    addNewScore: builder.mutation({
      query: (scoreData) => ({
        url: "scores",
        method: "POST",
        body: { ...scoreData },
      }),
      invalidatesTags: [{ type: "Score", id: "LIST" }]
    }),
    getScoreSheets: builder.query({
      query: (filter) => {
        const { class_id, student_id } = filter;
        const params = class_id ? { class_id } : { student_id };

        return {
          url: "score-sheets",
          params,
        };
      },
    }),
    getClassReportCards: builder.query({
      query: (class_id) => ({
        url: "report-cards",
        params: { class_id },
      }),
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Report Card", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Report Card", id })),
          ];
        } else return { type: "Report Card", id: "LIST" };
      },
    }),
    generateReportCards: builder.mutation({
      query: (reportCardData) => ({
        url: "report-cards",
        method: "POST",
        body: { ...reportCardData }
      })
    }),
    getStudentReportCard: builder.query({
      query: (student_id) => `report-cards/${student_id}`,
    }),
    updateStudentReportCard: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `report-cards/${id}`,
        method: "PUT",
        body: { ...rest },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Report Card", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetScoresQuery,
  useAddNewScoreMutation,
  useGetScoreSheetsQuery,
  useGetClassReportCardsQuery,
  useLazyGetStudentReportCardQuery,
  useUpdateStudentReportCardMutation,
  useGenerateReportCardsMutation
} = scoreApiSlice;
