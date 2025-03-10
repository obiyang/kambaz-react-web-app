import { Routes, Route, Navigate } from "react-router";
import React, { useState, useEffect } from "react";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import * as db from "./Database";
import { v4 as uuidv4 } from 'uuid';

export default function Kambaz() {
  const [courses, setCourses] = useState<any[]>(() => {
    const savedCourses = localStorage.getItem('courses');
    return savedCourses ? JSON.parse(savedCourses) : db.courses;
  });
  
  const [course, setCourse] = useState({
    _id: "1234", 
    name: "New Course", 
    number: "New Number",
    startDate: "2023-09-10", 
    endDate: "2023-12-15",
    department: "D123",  
    credits: 3,          
    image: "/images/reactjs.jpg", 
    description: "New Description"
  });
  
  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  const addNewCourse = () => {
    setCourses([...courses, { ...course, _id: uuidv4() }]);
  };

  const deleteCourse = (courseId: any) => {
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  const updateCourse = () => {
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };

  return (
    <div id="wd-kambaz">
      <KambazNavigation />
      <div className="wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<Navigate to="Dashboard" />} />
          <Route path="Account/*" element={<Account />} />
          <Route path="Dashboard" element={
            <Dashboard 
              courses={courses}
              course={course}
              setCourse={setCourse}
              addNewCourse={addNewCourse}
              deleteCourse={deleteCourse}
              updateCourse={updateCourse}
            />
          } />
          <Route path="Courses/:cid/*" element={<Courses courses={courses} />} />
          <Route path="Calendar" element={<h1>Calendar</h1>} />
          <Route path="Inbox" element={<h1>Inbox</h1>} />
        </Routes>
      </div>
    </div>
  );
}
