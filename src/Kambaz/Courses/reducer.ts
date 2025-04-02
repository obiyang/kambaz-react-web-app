import { createSlice } from "@reduxjs/toolkit";
import { courses } from "../Database";
import { v4 as uuidv4 } from "uuid";

const loadInitialState = () => {
  try {
    const savedCourses = localStorage.getItem("courses");
    console.log("Loading courses from localStorage:", savedCourses);
    return savedCourses ? { courses: JSON.parse(savedCourses) } : { courses: courses };
  } catch (error) {
    console.error("Error loading courses from localStorage:", error);
    return { courses: courses };
  }
};

const initialState = loadInitialState();
console.log("Initial courses state:", initialState);

const saveToLocalStorage = (courses: any) => {
  try {
    localStorage.setItem("courses", JSON.stringify(courses));
    console.log("Saved courses to localStorage:", courses);
  } catch (error) {
    console.error("Error saving courses to localStorage:", error);
  }
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, { payload: courses }) => {
      console.log("Setting courses from server:", courses);
      
      // 完全替换课程数据，而不是添加到现有数据
      state.courses = [...courses];
      
      // 清除 localStorage 中的课程数据，然后保存新数据
      localStorage.removeItem("courses");
      saveToLocalStorage(state.courses);
      
      console.log("Updated courses state with server data:", state.courses);
    },
    addCourse: (state, { payload: course }) => {
      // 如果课程已经存在（基于 _id），则不添加
      if (state.courses.some((c: any) => c._id === course._id)) {
        console.log("Course already exists, not adding:", course);
        return;
      }
      
      // 使用服务器提供的 ID，如果没有则生成新的 ID
      const courseId = course._id || uuidv4();
      console.log("Using course ID:", courseId);
      
      const newCourse: any = {
        ...course,
        _id: courseId,
      };
      
      console.log("Adding new course to state:", newCourse);
      
      state.courses = [...state.courses, newCourse] as any;
      
      saveToLocalStorage(state.courses);
      
      console.log("Updated courses state:", state.courses);
    },
    deleteCourse: (state, { payload: courseId }) => {
      console.log("Deleting course with ID:", courseId);
      state.courses = state.courses.filter(
        (c: any) => c._id !== courseId);
      console.log("Updated courses state after deletion:", state.courses);
      saveToLocalStorage(state.courses);
    },
    updateCourse: (state, { payload: course }) => {
      console.log("Updating course with ID:", course._id);
      state.courses = state.courses.map((c: any) =>
        c._id === course._id ? course : c
      ) as any;
      console.log("Updated courses state after update:", state.courses);
      saveToLocalStorage(state.courses);
    },
    editCourse: (state, { payload: courseId }) => {
      console.log("Editing course with ID:", courseId);
      state.courses = state.courses.map((c: any) =>
        c._id === courseId ? { ...c, editing: true } : { ...c, editing: false }
      ) as any;
      console.log("Updated courses state after edit:", state.courses);
    },
  },
});

export const { addCourse, deleteCourse, updateCourse, editCourse, setCourses } =
  coursesSlice.actions;
export default coursesSlice.reducer;