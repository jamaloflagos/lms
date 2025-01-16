import { apiSlice } from "../../app/api/apiSlice";

const termsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addNewTerm: builder.mutation({
            query: (termData) => ({
                url: "terms",
                method:"POST",
                body: { ...termData }
            }) 
        })
    })
})

export const { useAddNewTermMutation } = termsApiSlice