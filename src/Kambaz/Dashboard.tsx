import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addCourse, deleteCourse, updateCourse } from "./Courses/reducer";
import { enrollCourse, unenrollCourse } from "./Enrollments/reducer";
import * as courseClient from "./Courses/client"; // 修复导入路径
import * as enrollmentClient from "./Enrollments/client";
import * as userClient from "./Account/client";

export default function Dashboard({ 
  courses, 
  course, 
  setCourse, 
  addNewCourse, 
  deleteCourse: deleteCourseHandler, 
  updateCourse: updateCourseHandler,
  enrolling,
  setEnrolling,
  updateEnrollment
}: { 
  courses: any[]; 
  course: any; 
  setCourse: (course: any) => void; 
  addNewCourse: () => void; 
  deleteCourse: (courseId: string) => void; 
  updateCourse: () => void;
  enrolling: boolean;
  setEnrolling: (enrolling: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  // Check if current user has FACULTY role
  const isFaculty = currentUser?.role === "FACULTY";
  
  // Check if current user has STUDENT role
  const isStudent = currentUser?.role === "STUDENT";
  
  // State for showing all courses or only enrolled courses
  const [showAllCourses, setShowAllCourses] = useState(isFaculty ? true : false);
  
  // Local state only keeps the currently edited course
  const [currentCourse, setCurrentCourse] = useState({
    _id: "", 
    name: "New Course", 
    number: "New Number",
    startDate: "2023-09-10", 
    endDate: "2023-12-15",
    department: "D123",  
    credits: 3,          
    image: "/images/reactjs.jpg", 
    description: "New Description"
  });
  
  const getCourseImage = (courseId: string) => {
    const imageMap: { [key: string]: string } = {
      'RS101': '/images/rocket-propulsion.jpg',
      'RS102': '/images/aerodynamics.jpg',
      'RS103': '/images/spacecraft-design.jpg',
      'RS104': '/images/organic-chemistry.jpg',
      'RS105': '/images/inorganic-chemistry.jpg',
      'RS106': '/images/physical-chemistry.jpg',
      'RS107': '/images/ancient-languages.jpg',
      'RS108': '/images/middle-earth.jpg'
    };
    return imageMap[courseId] || '/images/reactjs.jpg';
  };

  // Check if user is enrolled in a course
  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment: any) => 
        enrollment.user === currentUser?._id && 
        enrollment.course === courseId
    );
  };

  // Handle course enrollment
  const handleEnrollCourse = (courseId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(enrollCourse({ userId: currentUser._id, courseId }));
  };

  // Handle course unenrollment
  const handleUnenrollCourse = (courseId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(unenrollCourse({ userId: currentUser._id, courseId }));
  };

  // Handle course navigation, only enrolled students can access courses
  const handleCourseNavigation = (courseId: string, event: React.MouseEvent) => {
    // 找到对应的课程对象
    const course = courses.find((c: any) => c._id === courseId);
    
    // 如果是学生且课程未注册，阻止导航
    if (isStudent && course && !course.enrolled) {
      event.preventDefault();
      // Student not enrolled in this course, prevent navigation
      return;
    }
    // Normal navigation for other cases
    navigate(`/Kambaz/Courses/${courseId}/Home`);
  };

  const displayedCourses = enrolling ? courses.filter((course: any) => course.enrolled) : courses;

  const handleAddNewCourse = async () => {
    try {
      // Create a new course object without the _id field
      const { _id, ...newCourse } = currentCourse; // Use object destructuring to exclude _id
      
      console.log("Adding new course to MongoDB:", newCourse);
      
      // 调用API将课程保存到MongoDB
      const createdCourse = await courseClient.createCourse(newCourse);
      console.log("Course created in MongoDB:", createdCourse);
      
      // 更新Redux状态
      dispatch(addCourse(createdCourse));
      
      // 获取当前用户并手动注册到新创建的课程
      try {
        const currentUser = await userClient.profile();
        if (currentUser && currentUser._id) {
          console.log("Manually enrolling user to course:", currentUser._id, createdCourse._id);
          await enrollmentClient.enrollUserInCourse(currentUser._id, createdCourse._id);
          console.log("User manually enrolled successfully");
        } else {
          console.log("No current user found, cannot enroll");
        }
      } catch (enrollError) {
        console.error("Error enrolling user to course:", enrollError);
      }
      
      // Reset form after adding
      setCurrentCourse({
        _id: "",
        name: "New Course", 
        number: "New Number",
        startDate: "2023-09-10", 
        endDate: "2023-12-15",
        department: "D123",  
        credits: 3,          
        image: "/images/reactjs.jpg", 
        description: "New Description"
      });
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      console.log("Deleting course from MongoDB:", courseId);
      
      // 调用API从MongoDB中删除课程
      const status = await courseClient.deleteCourse(courseId);
      console.log("Course deleted from MongoDB:", status);
      
      // 更新Redux状态
      dispatch(deleteCourse(courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleUpdateCourse = async () => {
    try {
      console.log("Updating course in MongoDB:", currentCourse);
      
      // 调用API更新MongoDB中的课程信息
      const status = await courseClient.updateCourse(currentCourse);
      console.log("Course updated in MongoDB:", status);
      
      // 更新Redux状态
      dispatch(updateCourse(currentCourse));
      
      // 重置表单
      setCurrentCourse({
        _id: "",
        name: "New Course", 
        number: "New Number",
        startDate: "2023-09-10", 
        endDate: "2023-12-15",
        department: "D123",  
        credits: 3,          
        image: "/images/reactjs.jpg", 
        description: "New Description"
      });
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  // Toggle between showing all courses or only enrolled courses
  const toggleCourseDisplay = () => {
    setEnrolling(!enrolling);
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
      </h1> <hr />
      
      {/* Only FACULTY role can see the new course form */}
      {isFaculty && (
        <>
          <h5>New Course
            <button className="btn btn-primary float-end"
                    id="wd-add-new-course-click"
                    onClick={handleAddNewCourse}>Add</button>
            <button className="btn btn-warning float-end me-2"
                    onClick={handleUpdateCourse} id="wd-update-course-click">
              Update
            </button>
          </h5><br />
          <FormControl value={currentCourse.name} className="mb-2"
                onChange={(e) => setCurrentCourse({ ...currentCourse, name: e.target.value })} />
          <FormControl value={currentCourse.description} as="textarea" 
                onChange={(e) => setCurrentCourse({ ...currentCourse, description: e.target.value })} />
          <hr />
        </>
      )}
      
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 id="wd-dashboard-published">
          {enrolling ? "My Courses" : "All Courses"} ({displayedCourses.length})
        </h2>
        
        {/* Toggle between all courses and enrolled courses */}
        <button 
          className="btn btn-primary" 
          onClick={toggleCourseDisplay}
        >
          {enrolling ? "All Courses" : "My Enrollments"}
        </button>
      </div>
      <hr />
      
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((course: any) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <div 
                  onClick={(e) => handleCourseNavigation(course._id, e)}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                  style={{ cursor: "pointer" }}
                >
                  <Card.Img 
                    src={getCourseImage(course._id)}
                    variant="top" 
                    width="100%" 
                    height={160}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/reactjs.jpg';
                    }}
                  />
                  <Card.Body className="card-body">
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </Card.Title>
                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description}
                    </Card.Text>
                    <Button variant="primary">Go</Button>
                    
                    {/* Only FACULTY role can see edit and delete buttons */}
                    {isFaculty && (
                      <>
                        <button onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation(); // Prevent event bubbling to parent element
                          handleDeleteCourse(course._id);
                        }} className="btn btn-danger float-end"
                        id="wd-delete-course-click">
                          Delete
                        </button>
                        <button id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation(); // Prevent event bubbling to parent element
                            setCurrentCourse({...course});
                          }}
                          className="btn btn-warning me-2 float-end">
                          Edit
                        </button>
                      </>
                    )}
                    
                    {/* Enrollment button */}
                    {isStudent && (
                      <button 
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          updateEnrollment(course._id, !course.enrolled);
                        }} 
                        className={`btn ${course.enrolled ? "btn-danger" : "btn-success"} float-end`}
                      >
                        {course.enrolled ? "Unenroll" : "Enroll"}
                      </button>
                    )}
                  </Card.Body>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}