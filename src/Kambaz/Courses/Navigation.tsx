import { NavLink } from "react-router-dom";

export default function CourseNavigation() {
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      <NavLink 
        to="/Kambaz/Courses/1234/Home" 
        id="wd-course-home-link"
        className={({ isActive }) => `list-group-item ${isActive ? 'active' : 'text-danger'} border border-0`}
      >
        Home
      </NavLink>
      
      <NavLink 
        to="/Kambaz/Courses/1234/Modules" 
        id="wd-course-modules-link"
        className={({ isActive }) => `list-group-item ${isActive ? 'active' : 'text-danger'} border border-0`}
      >
        Modules
      </NavLink>
      
      <NavLink 
        to="/Kambaz/Courses/1234/Piazza" 
        id="wd-course-piazza-link"
        className={({ isActive }) => `list-group-item ${isActive ? 'active' : 'text-danger'} border border-0`}
      >
        Piazza
      </NavLink>
      
      <NavLink 
        to="/Kambaz/Courses/1234/Zoom" 
        id="wd-course-zoom-link"
        className={({ isActive }) => `list-group-item ${isActive ? 'active' : 'text-danger'} border border-0`}
      >
        Zoom
      </NavLink>
      
      <NavLink 
        to="/Kambaz/Courses/1234/Assignments" 
        id="wd-course-quizzes-link"
        className={({ isActive }) => `list-group-item ${isActive ? 'active' : 'text-danger'} border border-0`}
      >
        Assignments
      </NavLink>
      
      <NavLink 
        to="/Kambaz/Courses/1234/Quizzes" 
        id="wd-course-assignments-link"
        className={({ isActive }) => `list-group-item ${isActive ? 'active' : 'text-danger'} border border-0`}
      >
        Quizzes
      </NavLink>
      
      <NavLink 
        to="/Kambaz/Courses/1234/Grades" 
        id="wd-course-grades-link"
        className={({ isActive }) => `list-group-item ${isActive ? 'active' : 'text-danger'} border border-0`}
      >
        Grades
      </NavLink>
      
      <NavLink 
        to="/Kambaz/Courses/1234/People" 
        id="wd-course-people-link"
        className={({ isActive }) => `list-group-item ${isActive ? 'active' : 'text-danger'} border border-0`}
      >
        People
      </NavLink>
    </div>
  );
}
