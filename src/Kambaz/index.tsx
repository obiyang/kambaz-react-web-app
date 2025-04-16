import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
import { setCourses } from "./Courses/reducer";

export default function Kambaz() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [courses, setCourseState] = useState<any[]>([]);
  const [enrolling, setEnrolling] = useState<boolean>(false);
  const [course, setCourse] = useState<any>({
    name: "New Course",
    number: "CS101",
    startDate: "2025-01-10",
    endDate: "2025-05-15",
    department: "Computer Science",
    credits: 3,
    image: "/images/reactjs.jpg",
    description: "Introduction to programming concepts"
  });

  const findCoursesForUser = async () => {
    try {
      const courses = await userClient.findCoursesForUser(currentUser._id);
      // 确保所有课程都标记为已注册
      const coursesWithEnrolled = courses.map((course: any) => ({
        ...course,
        enrolled: true
      }));
      setCourseState(coursesWithEnrolled);
      dispatch(setCourses(coursesWithEnrolled));
    } catch (error) {
      console.error(error);
    }
  };

  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    try {
      if (enrolled) {
        await userClient.enrollIntoCourse(currentUser._id, courseId);
      } else {
        await userClient.unenrollFromCourse(currentUser._id, courseId);
      }
      setCourseState(
        courses.map((course) => {
          if (course._id === courseId) {
            return { ...course, enrolled: enrolled };
          } else {
            return course;
          }
        })
      );
      // 更新Redux状态
      dispatch(setCourses(
        courses.map((course) => {
          if (course._id === courseId) {
            return { ...course, enrolled: enrolled };
          } else {
            return course;
          }
        })
      ));
    } catch (error) {
      console.error("Error updating enrollment:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const allCourses = await courseClient.fetchAllCourses();
      const enrolledCourses = await userClient.findCoursesForUser(
        currentUser._id
      );
      const courses = allCourses.map((course: any) => {
        if (enrolledCourses.find((c: any) => c._id === course._id)) {
          return { ...course, enrolled: true };
        } else {
          return course;
        }
      });
      setCourseState(courses);
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };

  const addNewCourse = async () => {
    try {
      const newCourse = await courseClient.createCourse(course);
      // 更新本地状态
      setCourseState([...courses, newCourse]);
      // 获取最新的课程列表并更新Redux状态
      fetchCourses();
      // Reset course form after successful creation
      setCourse({
        name: "New Course",
        number: "CS101",
        startDate: "2025-01-10",
        endDate: "2025-05-15",
        department: "Computer Science",
        credits: 3,
        image: "/images/reactjs.jpg",
        description: "Introduction to programming concepts"
      });
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const deleteCourse = async (courseId: string) => {
    try {
      const status = await courseClient.deleteCourse(courseId);
      console.log("Course deleted from MongoDB:", status);
      
      // 更新本地状态
      setCourseState(courses.filter((course) => course._id !== courseId));
      
      // 获取最新的课程列表并更新Redux状态
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      if (enrolling) {
        findCoursesForUser();
      } else {
        fetchCourses();
      }
    }
  }, [currentUser, enrolling]);

  return (
    <Session>
      <div id="wd-kambaz">
        <KambazNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="Account/*" element={<Account />} />
            <Route path="Dashboard" element={
              <ProtectedRoute>
                <Dashboard 
                  courses={courses} 
                  course={course} 
                  setCourse={setCourse}
                  addNewCourse={addNewCourse} 
                  deleteCourse={deleteCourse} 
                  enrolling={enrolling} 
                  setEnrolling={setEnrolling}
                  updateEnrollment={updateEnrollment}
                />
              </ProtectedRoute>
            } />
            <Route path="Courses/:cid/*" element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            } />
            <Route path="Calendar" element={<h1>Calendar</h1>} />
            <Route path="Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}