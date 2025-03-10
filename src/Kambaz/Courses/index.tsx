import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa6";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/table";

export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  const currentScreen = pathname.split("/")[4];

  return (
    <div id="wd-courses">
      <div className="d-flex align-items-center">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        <h2 className="text-danger m-0">
          {course && course.name} &gt; {currentScreen}
        </h2>
      </div>
      <hr />
      <div className="d-flex">
        <div className="d-none d-lg-block" style={{ width: "200px", minWidth: "200px" }}>
          <CourseNavigation />
        </div>
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="Piazza" element={<h2>Piazza</h2>} />
            <Route path="Zoom" element={<h2>Zoom</h2>} />
            <Route path="Quizzes" element={<h2>Quizzes</h2>} />
            <Route path="Grades" element={<h2>Grades</h2>} />
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
