import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../../Kambaz/Database";
import { v4 as uuidv4 } from "uuid";

const loadInitialState = () => {
  try {
    const savedAssignments = localStorage.getItem("assignments");
    return savedAssignments ? { assignments: JSON.parse(savedAssignments) } : { assignments: assignments };
  } catch (error) {
    console.error("Error loading assignments from localStorage:", error);
    return { assignments: assignments };
  }
};

const initialState = loadInitialState();

const saveToLocalStorage = (assignments: any) => {
  try {
    localStorage.setItem("assignments", JSON.stringify(assignments));
  } catch (error) {
    console.error("Error saving assignments to localStorage:", error);
  }
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment: any = {
        _id: uuidv4(),
        title: assignment.title,
        course: assignment.course,
        description: assignment.description || "",
        points: assignment.points || 100,
        dueDate: assignment.dueDate || "",
        availableFromDate: assignment.availableFromDate || "",
        availableUntilDate: assignment.availableUntilDate || "",
      };
      state.assignments = [...state.assignments, newAssignment] as any;
      saveToLocalStorage(state.assignments);
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId);
      saveToLocalStorage(state.assignments);
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignment._id ? assignment : a
      ) as any;
      saveToLocalStorage(state.assignments);
    },
    editAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignmentId ? { ...a, editing: true } : { ...a, editing: false }
      ) as any;
      saveToLocalStorage(state.assignments);
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment, editAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;