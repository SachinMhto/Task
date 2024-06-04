import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { BASE_URL, api, setAuthHeader } from "../Api/Api";

export const fetchTasks = createAsyncThunk("task/fetchTasks",
    async ({ status }) => {
        setAuthHeader(localStorage.getItem("jwt"), api);
        try {
            const { data } = await api.get(`/api/task`, {
                params: { status }
            });
            console.log("fetch: ", data);
            return data;
        } catch (error) {
            console.log("Error", error);
            throw Error(error.response.data.error);
        }
    }
); 

export const fetchUsersTasks = createAsyncThunk("task/fetchUserTasks",
    async ({ status }) => {
        setAuthHeader(localStorage.getItem("jwt"), api);
        try {
            const { data } = await api.get(`/api/task/user`, {
                params: { status }
            });
            console.log("fetch user task: ", data);
            return data;
        } catch (error) {
            console.log("Error", error);
            throw Error(error.response.data.error);
        }
    }
);

export const fetchTasksById = createAsyncThunk("task/fetchTasksById",
    async (taskId) => {
        setAuthHeader(localStorage.getItem("jwt"), api);
        try {
            const { data } = await api.get(`/api/task/${taskId}`);
            console.log("fetchtask by id: ", data);
            return data;
        } catch (error) {
            console.log("Error", error);
            throw Error(error.response.data.error);
        }
    }
);

export const createTask = createAsyncThunk("task/createTask",
    async (taskData) => {
        setAuthHeader(localStorage.getItem("jwt"), api);
        try {
            const { data } = await api.post(`/api/task`, taskData);
            console.log("create task: ", data);
            return data;
        } catch (error) {
            console.log("Error", error);
            throw Error(error.response.data.error);
        }
    }
);

export const updateTask = createAsyncThunk("task/updateTask",
    async ({ id, updatedTaskData }) => {
        setAuthHeader(localStorage.getItem("jwt"), api);
        try {
            console.log("before hitting: ", id);
            console.log("before hitting: ",updatedTaskData);
            
            const { } = await api.put(`/api/task/${id}`, updatedTaskData);
            console.log("update task: ", data);
            return data;
        } catch (error) {
            console.log("Error", error);
            throw Error(error.response.data.error);
        }
    }
);

export const assignTaskToUser = createAsyncThunk("task/assignTaskToUser",
    async ({ taskId, userId }) => {
        setAuthHeader(localStorage.getItem("jwt"), api);
        try {
            const { data } = await api.put(`/api/task/${taskId}/user/${userId}/assigned`);
            console.log("assignTaskToUser: ", data);
            return data;
        } catch (error) {
            console.log("Error", error);
            throw Error(error.response.data.error);
        }
    }
);

export const deleteTask = createAsyncThunk("task/deleteTask",
    async ({ taskId }) => {
        setAuthHeader(localStorage.getItem("jwt"), api);
        try {
            await api.delete(`/api/task/${taskId}`);
            console.log("deleteTask successfully");
            return taskId;
        } catch (error) {
            console.log("Error", error);
            throw Error(error.response.data.error);
        }
    }
);

const taskSlice = createSlice({
    name: "task",
    initialState: {
        tasks: [],
        loading: false,
        error: null,
        taskDetails: null,
        usersTask: []
    },
    reducers: {},
    extraReducers: (builder) => { 
        builder
            .addCase(fetchTasks.pending, (state) => { 
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => { 
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => { 
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(fetchUsersTasks.pending, (state) => { 
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsersTasks.fulfilled, (state, action) => { 
                state.loading = false;
                state.usersTask = action.payload;
            })
            .addCase(fetchUsersTasks.rejected, (state, action) => { 
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(createTask.pending, (state) => { 
                state.loading = true;
                state.error = null;
            })
            .addCase(createTask.fulfilled, (state, action) => { 
                state.loading = false;
                state.tasks.push(action.payload);
            })
            .addCase(createTask.rejected, (state, action) => { 
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(updateTask.pending, (state) => { 
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTask.fulfilled, (state, action) => { 
                const updatedTask = action.payload;
                state.loading = false;
                state.tasks = state.tasks.map((task) => task.id === updatedTask.id ? { ...task, ...updatedTask } : task);
            })
            .addCase(updateTask.rejected, (state, action) => { 
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(assignTaskToUser.fulfilled, (state, action) => { 
                const updatedTask = action.payload;
                state.loading = false;
                state.tasks = state.tasks.map((task) => task.id === updatedTask.id ? { ...task, ...updatedTask } : task);
            })
            .addCase(deleteTask.fulfilled, (state, action) => { 
                state.loading = false;
                state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            })
            .addCase(fetchTasksById.fulfilled, (state, action) => { 
                state.loading = false;
                state.taskDetails = action.payload;
            })
        
    }
});

export default taskSlice.reducer;
