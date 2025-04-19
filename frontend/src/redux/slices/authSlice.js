import { createSlice } from "@reduxjs/toolkit";

//! Initial State
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: JSON.parse(localStorage.getItem("userInfo")) || null,

    },
    //! Reducers
    reducers: {
        loginAction: (state, action) => {
            state.user = action.payload;
        },
        logoutAction: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        }
    },
});

//! Generate the actions
export const { loginAction, logoutAction } = authSlice.actions;
//! Generate the reducer
const authReducer = authSlice.reducer;
export default authReducer;