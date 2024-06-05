import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, api, setAuthHeader } from "../Api/Api";

export const login = createAsyncThunk("auth/login", async (userData) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/auth/signin`, userData);
        localStorage.setItem("jwt", data.jwt);
        console.log("Login Success", data);
        return data;
    } catch (error) {
        console.log("Error from signin api: ", error);
        throw Error(error.response.data.error);
    }
});

export const register = createAsyncThunk("auth/register", async (userData) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/auth/signup`, userData);
        console.log("User Data Before Register: ",userData);
        localStorage.setItem("jwt", data.jwt);
        console.log("Register Success", data);
        return data;
    } catch (error) {
        console.log("Error from signup api: ", error);
        throw Error(error.response.data.error);
    }
});

export const logout = createAsyncThunk("auth/logout", async () => {
    try {
        localStorage.clear();
    } catch (error) {
        console.log("Error from logout api: ", error);
        throw Error(error.response.data.error);
    }
});

export const getUserProfile = createAsyncThunk("auth/getUserProfile", async (jwt) => {
    setAuthHeader(jwt);
    try {
        const { data } = await api.get(`/api/user`);
        console.log("get UserProfile Success:", data);
        return data;
    } catch (error) {
        console.log("Error from getUserProfile api: ", error);
        throw Error(error.response.data.error);
    }
});
export const getUserList = createAsyncThunk("auth/getUserList", async (jwt) => {
    setAuthHeader(jwt, api);
    try {
        const { data } = await api.get(`/api`);
        console.log("UserList: ",data);
        return data;
    } catch (error) {

    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loggedIn: false,
        loading: false,
        error: null,
        jwt: null,
        users:[],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.jwt = action.payload.jwt;
                state.loggedIn = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.loggedIn =false;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.loggedIn = true;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getUserList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserList.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
                state.loggedIn = true;
            })
            .addCase(getUserList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.error = null;
                state.jwt = null;
                state.loggedIn = false;
            });
    }
});

export default authSlice.reducer;
