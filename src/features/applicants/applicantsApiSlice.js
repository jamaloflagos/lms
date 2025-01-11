import { apiSlice } from "../../app/api/apiSlice";

const applicantsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        apply: builder.mutation({
            query: (applicantData) => ({
                url: "applicants",
                method: "POST",
                body: { ...applicantData }
            })
        }),
        getEntranceExamQuestions: builder.query({
            query: () => "entrance-exam-questions"
        }),
        submitEntranceExamAnswers: builder.mutation({
            query: (scoreData) => ({
                url: "entrance-exam-score",
                method: "POST",
                body: { ...scoreData }
            })
        }),
        getEntranceExamScore: builder.query({
            query: (applicantId) => `entrance-exam-score/${applicantId}`
        })
    })
})

export const {
    useApplyMutation,
    useGetEntranceExamQuestionsQuery,
    useSubmitEntranceExamAnswersMutation,
    useGetEntranceExamScoreQuery
} = applicantsApiSlice