import { createSlice } from "@reduxjs/toolkit";

//! Initial State
const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: JSON.parse(localStorage.getItem("token")) || null,

    },
    //! Reducers
    reducers: {
        loginAction: (state, action) => {
            state.token = action.payload;
        },
    },
});

//! Generate the actions
export const { loginAction } = authSlice.actions;
//! Generate the reducer
const authReducer = authSlice.reducer;
export default authReducer;