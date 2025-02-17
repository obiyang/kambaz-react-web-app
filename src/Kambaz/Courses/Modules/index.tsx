import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router";
import * as db from "../../Database";
import LessonControlButtons from "./LessonControlButtons";
import ModulesControls from "./ModulesControls";
import GreenCheckmark from "./GreenCheckmark";

interface Lesson {
  _id: string;
  name: string;
  module: string;
}

interface Module {
  _id: string;
  name: string;
  course: string;
  lessons?: Lesson[];
}

export default function Modules() {
  const { cid } = useParams();
  const modules = db.modules as Module[];

  return (
    <div>
      <ModulesControls /><br /><br /><br />
      <ul id="wd-modules" className="list-group rounded-0">
        {modules
          .filter((module) => module.course === cid)
          .map((module) => (
            <li key={module._id} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  {module.name}
                </div>
                <div className="d-flex align-items-center">
                  <GreenCheckmark />
                  <button className="btn btn-transparent">
                    <FaPlus className="ms-2" />
                  </button>
                  <button className="btn btn-transparent">
                    <BsThreeDotsVertical className="ms-2" />
                  </button>
                </div>
              </div>
              {module.lessons && (
                <ul className="wd-lessons list-group rounded-0">
                  {module.lessons.map((lesson) => (
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