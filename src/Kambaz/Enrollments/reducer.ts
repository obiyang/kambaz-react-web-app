import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";
import { v4 as uuidv4 } from "uuid";

const loadInitialState = () => {
  try {
    const savedEnrollments = localStorage.getItem("enrollments");
    return savedEnrollments ? { enrollments: JSON.parse(savedEnrollments) } : { enrollments: enrollments };
  } catch (error) {
    console.error("Error loading enrollments from localStorage:", error);
    return { enrollments: enrollments };
  }
};

const initialState = loadInitialState();

const saveToLocalStorage = (enrollments: any) => {
  try {
    localStorage.setItem("enrollments", JSON.stringify(enrollments));
  } catch (error) {
    console.error("Error saving enrollments to localStorage:", error);
  }
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enrollCourse: (state, { payload }) => {
      const { userId, courseId } = payload;
      const isEnrolled = state.enrollments.some(
        (e: any) => e.user === userId && e.course === courseId
      );
      
      if (!isEnrolled) {
        const newEnrollment = {
          _id: uuidv4(),
          user: userId,
          course: courseId
        };
        state.enrollments = [...state.enrollments, newEnrollment];
        saveToLocalStorage(state.enrollments);
      }
    },
    unenrollCourse: (state, { payload }) => {
      const { userId, courseId } = payload;
      state.enrollments = state.enrollments.filter(
        (e: any) => !(e.user === userId && e.course === courseId)
      );
      saveToLocalStorage(state.enrollments);
    }
  },
});

export const { enrollCourse, unenrollCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;