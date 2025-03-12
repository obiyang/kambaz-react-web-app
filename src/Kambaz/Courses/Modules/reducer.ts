import { createSlice } from "@reduxjs/toolkit";
import { modules } from "../../Database";
import { v4 as uuidv4 } from "uuid";

interface Module {
  _id: string;
  name: string;
  course: string;
  lessons?: any[];
  editing?: boolean;
}

const loadInitialState = () => {
  try {
    const savedModules = localStorage.getItem("modules");
    return savedModules ? { modules: JSON.parse(savedModules) } : { modules: modules };
  } catch (error) {
    console.error("Error loading modules from localStorage:", error);
    return { modules: modules };
  }
};

const initialState = loadInitialState();

const saveToLocalStorage = (modules: any[]) => {
  try {
    localStorage.setItem("modules", JSON.stringify(modules));
  } catch (error) {
    console.error("Error saving modules to localStorage:", error);
  }
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addModule: (state, { payload: module }) => {
      const newModule: Module = {
        _id: uuidv4(),
        lessons: [],
        name: module.name,
        course: module.course,
      };
      state.modules = [...state.modules, newModule] as any;
      saveToLocalStorage(state.modules);
    },
    deleteModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.filter(
        (m: any) => m._id !== moduleId);
      saveToLocalStorage(state.modules);
    },
    updateModule: (state, { payload: module }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === module._id ? module : m
      ) as any;
      saveToLocalStorage(state.modules);
    },
    editModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === moduleId ? { ...m, editing: true } : m
      ) as any;
      saveToLocalStorage(state.modules);
    },
  },
});
export const { addModule, deleteModule, updateModule, editModule } =
  modulesSlice.actions;
export default modulesSlice.reducer;