import { createSlice } from "@reduxjs/toolkit";
import { courses } from "../Database";
import { v4 as uuidv4 } from "uuid";

const loadInitialState = () => {
  try {
    const savedCourses = localStorage.getItem("courses");
    return savedCourses ? { courses: JSON.parse(savedCourses) } : { courses: courses };
  } catch (error) {
    console.error("Error loading courses from localStorage:", error);
    return { courses: courses };
  }
};

const initialState = loadInitialState();

const saveToLocalStorage = (courses: any) => {
  try {
    localStorage.setItem("courses", JSON.stringify(courses));
  } catch (error) {
    console.error("Error saving courses to localStorage:", error);
  }
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, { payload: course }) => {
      const newCourse: any = {
        ...course,
        _id: uuidv4(),
      };
      state.courses = [...state.courses, newCourse] as any;
      saveToLocalStorage(state.courses);
    },
    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter(
        (c: any) => c._id !== courseId);
      saveToLocalStorage(state.courses);
    },
    updateCourse: (state, { payload: course }) => {
      state.courses = state.courses.map((c: any) =>
        c._id === course._id ? course : c
      ) as any;
      saveToLocalStorage(state.courses);
    },
    editCourse: (state, { payload: courseId }) => {
      // 这个函数可以用于设置编辑状态，如果需要的话
      state.courses = state.courses.map((c: any) =>
        c._id === courseId ? { ...c, editing: true } : { ...c, editing: false }
      ) as any;
    },
  },
});

export const { addCourse, deleteCourse, updateCourse, editCourse } =
  coursesSlice.actions;
export default coursesSlice.reducer;