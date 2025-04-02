import { BsGripVertical } from "react-icons/bs";
import { useParams } from "react-router";
import LessonControlButtons from "./LessonControlButtons";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import { useState, useEffect } from "react";
import { FormControl } from "react-bootstrap";
import { addModule, editModule, updateModule, deleteModule, setModules }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";
import * as modulesClient from "./client";

interface Lesson {
  _id: string;
  name: string;
  module: string;
}

export default function Modules() {
  const { cid } = useParams();
  
  const [moduleName, setModuleName] = useState("");
  
  const modules = useSelector((state: any) => state.modulesReducer.modules);
  const dispatch = useDispatch();
  const saveModule = async (module: any) => {
    await modulesClient.updateModule(module);
    dispatch(updateModule(module));
  };

  const removeModule = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };


  const createModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const module = await coursesClient.createModuleForCourse(cid, newModule);
    dispatch(addModule(module));
  };

  
  const fetchModules = async () => {
    const modules = await coursesClient.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };
  useEffect(() => {
    fetchModules();
  }, []);

  
  return (
    <div>
      <ModulesControls 
        moduleName={moduleName} 
        setModuleName={setModuleName}
        addModule={createModuleForCourse} />
      <br /><br /><br />
      <ul id="wd-modules" className="list-group rounded-0">
        {modules
          .map((module: any) => (
            <li key={module._id} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  {!module.editing && module.name}
                  {module.editing && (
                    <FormControl 
                      className="w-50 d-inline-block"
                      style={{ backgroundColor: 'transparent', border: 'none', color: 'inherit' }}
                      onChange={(e) => 
                        dispatch(
                          updateModule({ ...module, name: e.target.value })
                        )
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          saveModule({ ...module, editing: false });
                        }
                      }}
                      onBlur={() => dispatch(updateModule({ ...module, editing: false }))}
                      defaultValue={module.name}
                      autoFocus
                    />
                  )}
                </div>
                <div className="d-flex align-items-center">
                  <ModuleControlButtons 
                    moduleId={module._id}
                    deleteModule={(moduleId) => removeModule(moduleId)}
                    editModule={(moduleId) => dispatch(editModule(moduleId))} />
                </div>
              </div>
              {module.lessons && (
                <ul className="wd-lessons list-group rounded-0">
                  {module.lessons.map((lesson: Lesson) => (
                    <li key={lesson._id} className="wd-lesson list-group-item p-3 ps-1">
                      <div className="d-flex align-items-center justify-content-between w-100">
                        <div className="d-flex align-items-center">
                          <BsGripVertical className="me-2 fs-3" />
                          <span className="wd-title">{lesson.name}</span>
                        </div>
                        <LessonControlButtons />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}