import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Define initial state
const initialState = {
  isLoading: false,
  studentsData: [],
  errorMessage: null,
  getStudentStatus: null,
  addAssignmentData: [],
  addAssignmentStatus: null,
  erroraddAssignment: [],
  getResourceData: [],
  getResourceStatus: null,
  errorgetResource: [],
};

export const getStudent = createAsyncThunk(
  "api/student",
  async (_, thunkAPI) => {
    try {
      const res = await api.get(`/students`, {
        headers: {},
      });
      console.log(res.data);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      // console.log(error.response.data.error);
      return thunkAPI.rejectWithValue(
        error.response.data.error || "getting student failed"
      );
    }
  }
);

export const getResource = createAsyncThunk(
  "api/resources",
  async (_, thunkAPI) => {
    try {
      const res = await api.get(`/resources`, {
        headers: {},
      });
      console.log(res.data);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      // console.log(error.response.data.error);
      return thunkAPI.rejectWithValue(
        error.response.data.error || "getting resources failed"
      );
    }
  }
);

export const addAssignment = createAsyncThunk(
  "student/assignment",
  async (data, thunkAPI) => {
    try {
      const res = await api.post(`assignment`, data, {
        headers: {},
      });
      console.log(res.data);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      console.log(error.response.data.msg, error);
      return thunkAPI.rejectWithValue(
        error.response.data.msg || "failed to add assignment"
      );
    }
  }
);

// Create a user slice
const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudent.pending, (state) => {
        state.isLoading = true;
        state.getStudentStatus = "pending";
        state.errorMessage = null;
      })
      .addCase(getStudent.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.studentsData = payload;
        state.getStudentStatus = "fulfilled";
        state.errorMessage = null;
      })
      .addCase(getStudent.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.getStudentStatus = "failed";
        state.errorMessage = payload;
        console.log({ payload });
      })
      .addCase(addAssignment.pending, (state) => {
        state.isLoading = true;
        state.addAssignmentStatus = "pending";
        state.erroraddAssignment = null;
      })
      .addCase(addAssignment.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.addAssignmentData = payload;
        state.addAssignmentStatus = "fulfilled";
        state.erroraddAssignment = null;
      })
      .addCase(addAssignment.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.addAssignmentStatus = "failed";
        state.erroraddAssignment = payload;
        console.log({ payload });
      })
      .addCase(getResource.pending, (state) => {
        state.isLoading = true;
        state.getResourceStatus = "pending";
        state.errorgetResource = null;
      })
      .addCase(getResource.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.getResourceData = payload;
        state.getResourceStatus = "fulfilled";
        state.errorgetResource = null;
      })
      .addCase(getResource.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.getResourceStatus = "failed";
        state.errorgetResource = payload;
        console.log({ payload });
      });
  },
});

// Export the user slice and its actions
export default studentSlice.reducer;
