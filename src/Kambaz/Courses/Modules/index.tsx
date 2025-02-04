import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import LessonControlButtons from "./LessonControlButtons";
import ModulesControls from "./ModulesControls";
import GreenCheckmark from "./GreenCheckmark";

export default function Modules() {
    return (
      <div>
        <ModulesControls /><br /><br /><br />
        <ul id="wd-modules" className="list-group rounded-0">
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                Week 1
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
            <ul className="wd-lessons list-group rounded-0">
              <li className="wd-lesson list-group-item p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <LessonControlButtons />
              </li>
              <li className="wd-lesson list-group-item p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />
                <span className="wd-title">Introduction to the course</span>
                <LessonControlButtons />
              </li>
              <li className="wd-lesson list-group-item p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />
                <span className="wd-title">Learn what is web development</span>
                <LessonControlButtons />
              </li>
            </ul>
          </li>
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                Week 2
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
            <ul className="wd-lessons list-group rounded-0">
              <li className="wd-lesson list-group-item p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />
                <span className="wd-title">LESSON 1</span>
                <LessonControlButtons />
              </li>
              <li className="wd-lesson list-group-item p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />
                <span className="wd-title">LESSON 2</span>
                <LessonControlButtons />
              </li>
            </ul>
          </li>
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                Week 3
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
            <ul className="wd-lessons list-group rounded-0">
              <li className="wd-lesson list-group-item p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />
                <span className="wd-title">LESSON 1</span>
                <LessonControlButtons />
              </li>
              <li className="wd-lesson list-group-item p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />
                <span className="wd-title">LESSON 2</span>
                <LessonControlButtons />
              </li>
            </ul>
          </li>
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                Week 4
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
            <ul className="wd-lessons list-group rounded-0">
              <li className="wd-lesson list-group-item p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />
                <span className="wd-title">LESSON 1</span>
                <LessonControlButtons />
              </li>
              <li className="wd-lesson list-group-item p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />
                <span className="wd-title">LESSON 2</span>
                <LessonControlButtons />
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
}