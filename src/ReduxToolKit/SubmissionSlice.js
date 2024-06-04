import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../Api/Api";

export const submitTask = createAsyncThunk(
  'submission/submitTask',
  async ({ taskId, githubLink }, { rejectWithValue }) => {
    setAuthHeader(localStorage.getItem('jwt'));
    try {
      console.log('Submitting task with ID:', taskId, 'and GitHub link:', githubLink);
      const response = await api.post(`/api/submission`, null, {
        params: { taskId, github_link: githubLink }
      });
      console.log('Submitted Task:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error submitting task:', error);
      return rejectWithValue(error.response?.data?.error || 'Unknown error');
    }
  }
);

export const fetchAllSubmission = createAsyncThunk("submission/fetchAllSubmission",
    async () => { 
        setAuthHeader(localStorage.getItem("jwt", api))
        try {
            const { data } = await api.get(`/api/submission`, {});
            console.log("Submitted Task: ",data);
            return data;
        } catch (error) {
            console.log("error: ", error);
            throw Error(error.response.data.error);
        }
    } 
);
export const fetchSubmissionByTaskId = createAsyncThunk("submission/fetchSubmissionByTaskId",
    async (taskId) => { 
        setAuthHeader(localStorage.getItem("jwt"), api)
        try {
            const { data } = await api.get(`/api/submission/task/${taskId}`, {});
            console.log("fetchSubmissionByTaskId: ",data);
            return data;
        } catch (error) {
            console.log("error: ", error);
            throw Error(error.response.data.error);
        }
    } 
);
export const acceptDeclineSubmission = createAsyncThunk(
  "submission/acceptDeclineSubmission",
  async ({ id, status }, { rejectWithValue }) => {
    setAuthHeader(localStorage.getItem("jwt"));
    try {
      console.log(`Updating submission with ID: ${id} to status: ${status}`);
      const response = await api.put(`/api/submission/${id}`, null, {
        params: { status }
      });
      console.log("Updated submission:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating submission:", error);
      return rejectWithValue(error.response?.data?.error || 'Unknown error');
    }
  }
);
const submissionSlice = createSlice({
    name: "submission",
    initialState: {
        submission: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => { 
        builder
            .addCase(submitTask.pending, (state) => {
                state.status = "loading";
            })
            .addCase(submitTask.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.submission.push(action.payload);
            })
            .addCase(submitTask.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
       
            .addCase(fetchAllSubmission.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.submission = action.payload;
            })
            .addCase(fetchAllSubmission.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
           
            .addCase(fetchSubmissionByTaskId.fulfilled, (state, action) => {
                state.submission = action.payload;
                state.status = "succeeded";
            })
            .addCase(acceptDeclineSubmission.fulfilled, (state, action) => {
    state.status = "succeeded";
    state.submission = state.submission.map((item) => {
        return item.id !== action.payload.id ? item : action.payload;
    });
});

    },
});
export default submissionSlice.reducer;