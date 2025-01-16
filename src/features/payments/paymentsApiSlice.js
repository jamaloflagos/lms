import { apiSlice } from "../../app/api/apiSlice";

const paymentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        verifyPayment: builder.mutation({
            query: (paymentData) => ({
                url: "verify_payments",
                method: "POST",
                body: { ...paymentData }
            })
        }),
        verifyEmail: builder.mutation({
            query: ({ email }) => ({
                url: "verify_email",
                method: "POST",
                body: { email }
            })
        })
    })
})

export const { useVerifyPaymentMutation, useVerifyEmailMutation } = paymentApiSlice