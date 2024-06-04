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
            console.log("Submitted Task: ",data);
            return data;
        } catch (error) {
            console.log("error: ", error);
            throw Error(error.response.data.error);
        }
    } 
);
export const acceptDeclineSubmission = createAsyncThunk("submission/acceptDeclineSubmission",
    async ({ id,status}) => { 
        setAuthHeader(localStorage.getItem("jwt", api))
        try {
            const { data } = await api.put(`/api/submission/${id}?status=${status}`, {});
            console.log("accept task: ",data);
            return data;
        } catch (error) {
            console.log("error: ", error);
            throw Error(error.response.data.error);
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
                state.status = "succeeded";
                state.submission=state.submission.map((item)=>item.id!=action.payload.id? item:action.payload);
                
            });
    },
});
export default submissionSlice.reducer;