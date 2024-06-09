import { configureStore } from "@reduxjs/toolkit";
import studentSlice from "./features/classroom/studentSlice";

export const store = configureStore({
  reducer: {
    student: studentSlice,
  },
});
