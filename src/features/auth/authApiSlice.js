import { apiSlice } from "../../app/api/apiSlice"
import { logout, setCredentials } from "./authSlice"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => {
                console.log(credentials)
                return {
                    url: "/auth",
                    method: "POST",
                    body: { ...credentials }
                }
            }
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data)
                    dispatch(logout())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: "/auth/refresh",
                method: "POST",
                credentials: "include",  // ⬅️ Ensures the refresh cookie is sent!
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const { access: accessToken } = data;
                    dispatch(setCredentials({ accessToken }));
                } catch (err) {
                    console.log("Refresh error:", err);
                }
            }
        }),
        
    })
})

export const {
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation,
} = authApiSlice 