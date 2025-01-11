import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const subjectAdapter = createEntityAdapter()
const subjectInitialState = subjectAdapter.getInitialState()
const outlineAdapter = createEntityAdapter()
const outlineInitialState = outlineAdapter.getInitialState()
const noteAdapter = createEntityAdapter()
const noteInitialState = noteAdapter.getInitialState()

const subjectsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSubjects: builder.query({
            query: (filter) => {
              let params;
              if (filter) {
                const { class_id, teacher_id } = filter
                if (class_id) {
                  params = {class_id}
                } else if (teacher_id) {
                  params = {teacher_id}
                }
              } else {
                params = {}
              }
              return {
                url: "/subjects",
                params
              }
            },
            transformResponse: (responseData) => {
                return subjectAdapter.setAll(subjectInitialState, responseData)
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
        getOutlines: builder.query({
          query: ({ class_id, subject_id }) => ({
            url: "outlines",
            params: {class_id, subject_id}
          }),
          transformErrorResponse: (responseData) => {
            outlineAdapter.setAll(outlineInitialState, responseData)
          }, 
          providesTags: (result, error, arg) => {
            if (result?.ids) {
              return [
                { type: "Outline", id: "LIST" },
                ...result.ids.map((id) => ({ type: "Outline", id })),
              ];
            } else return { type: "Outline", id: "LIST" };
          },
        }),
        addNewOutline: builder.mutation({
          query: (outlineData) => ({
            url: "outlines",
            method: "POST",
            body: {...outlineData}
          }),
          invalidatesTags: [{ type: "Outline", id: "LIST" }]
        }),
        updateOutline: builder.mutation({
          query: ({ id, ...rest }) => ({
            url: `/outlines/${id}`,
            method: "PUT",
            body: {...rest}
          }), 
          invalidatesTags: (result, error, arg) => [
            {type: "Oultine", id: arg.id}
          ]
        }),
        deleteOutline: builder.mutation({
          query: ({ id }) => ({
            url: `/outlines/${id}`,
            method: "DELETE",
          }),
          invalidatesTags: (result, error, arg) => [
            { type: "Outline", id: arg.id },
          ],
        }),
        getNotes: builder.query({
          query: (outlineId) => ({
            url: "/notes",
            params: {outline_id: outlineId}
          }),
          transformResponse: (responseData) => {
            noteAdapter.setAll(noteInitialState, responseData)
          },
          providesTags: (result, error, arg) => {
            if (result?.ids) {
              return [
                { type: "Note", id: "LIST" },
                ...result.ids.map((id) => ({ type: "Note", id })),
              ];
            } else return { type: "Note", id: "LIST" };
          },
        }),
        addNewNote: builder.mutation({
          query: (noteData) => ({
            url: "notes",
            method: "POST",
            body: { ...noteData }
          }),
          invalidatesTags: [{ type: "Note", id: "LIST" }]
        }),
        updateNote: builder.mutation({
          query: ({ id, ...rest }) => ({
            url: `/notes/${id}`,
            method: "PUT",
            body: { ...rest }
          }),
          invalidatesTags: (result, error, arg) => [
            { type: "Outline", id: arg.id },
          ],
        }),
        deleteNote: builder.mutation({
          query: ({ id }) => ({
            url: `/notes/${id}`,
            method: "DELETE",
            body: {id}
          }),
          invalidatesTags: (result, error, arg) => [
            { type: "Outline", id: arg.id },
          ],
        })
    })
})


export const {
    useGetSubjectsQuery,
    useGetOutlinesQuery,
    useAddNewOutlineMutation,
    useUpdateOutlineMutation,
    useDeleteOutlineMutation,
    useGetNotesQuery,
    useAddNewNoteMutation,
    useUpdateNoteMutation,
    useDeleteNoteMutation
} = subjectsApiSlice