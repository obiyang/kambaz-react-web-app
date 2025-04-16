import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  courses: []
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, { payload: courses }) => {
      console.log("Setting courses from server:", courses);
      
      // 完全替换课程数据，而不是添加到现有数据
      state.courses = [...courses];
    },
    
    addCourse: (state, { payload: course }) => {
      // 创建一个新的课程对象，确保有唯一的ID
      const newCourse = {
        ...course,
        _id: course._id || uuidv4(),
      };
      
      // 添加新课程到状态
      state.courses.push(newCourse);
    },
    
    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter((c) => c._id !== courseId);
    },
    
    updateCourse: (state, { payload: course }) => {
      state.courses = state.courses.map((c) =>
        c._id === course._id ? { ...c, ...course } : c
      );
    },
    
    editCourse: (state, { payload: courseId }) => {
      // 这个函数似乎没有实际修改状态，只是用于标记正在编辑的课程
      // 如果需要，可以在这里添加逻辑
    },
  },
});

export const { addCourse, deleteCourse, updateCourse, editCourse, setCourses } =
  coursesSlice.actions;
export default coursesSlice.reducer;