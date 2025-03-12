import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addCourse, deleteCourse, updateCourse } from "./Courses/reducer";
import { enrollCourse, unenrollCourse } from "./Enrollments/reducer";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  // 本地状态只保留当前正在编辑的课程
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
  
  // 显示所有课程或仅显示已注册课程的状态
  const [showAllCourses, setShowAllCourses] = useState(false);
  
  // 检查当前用户是否为FACULTY角色
  const isFaculty = currentUser?.role === "FACULTY";
  
  // 检查当前用户是否为STUDENT角色
  const isStudent = currentUser?.role === "STUDENT";

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

  // 检查用户是否已注册课程
  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment: any) => 
        enrollment.user === currentUser?._id && 
        enrollment.course === courseId
    );
  };

  // 处理注册课程
  const handleEnrollCourse = (courseId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(enrollCourse({ userId: currentUser._id, courseId }));
  };

  // 处理退订课程
  const handleUnenrollCourse = (courseId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(unenrollCourse({ userId: currentUser._id, courseId }));
  };

  // 处理课程导航，只有已注册的学生才能访问课程
  const handleCourseNavigation = (courseId: string, event: React.MouseEvent) => {
    if (isStudent && !isEnrolled(courseId)) {
      event.preventDefault();
      // 学生未注册该课程，阻止导航
      return;
    }
    // 其他情况正常导航
    navigate(`/Kambaz/Courses/${courseId}/Home`);
  };

  // 根据显示模式选择要显示的课程
  const displayedCourses = showAllCourses 
    ? courses 
    : courses.filter((course: any) => isEnrolled(course._id));

  const handleAddNewCourse = () => {
    dispatch(addCourse(course));
  };

  const handleDeleteCourse = (courseId: string) => {
    dispatch(deleteCourse(courseId));
  };

  const handleUpdateCourse = () => {
    dispatch(updateCourse(course));
  };

  // 切换显示所有课程或仅显示已注册课程
  const toggleCourseDisplay = () => {
    setShowAllCourses(!showAllCourses);
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      
      {/* 只有FACULTY角色才能看到新课程表单 */}
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
          <FormControl value={course.name} className="mb-2"
                onChange={(e) => setCourse({ ...course, name: e.target.value })} />
          <FormControl value={course.description} as="textarea" 
                onChange={(e) => setCourse({ ...course, description: e.target.value })} />
          <hr />
        </>
      )}
      
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 id="wd-dashboard-published">
          {showAllCourses ? "All Courses" : "My Courses"} ({displayedCourses.length})
        </h2>
        
        {/* 只有STUDENT角色才能看到Enrollments按钮 */}
        {isStudent && (
          <button 
            className="btn btn-primary" 
            onClick={toggleCourseDisplay}
          >
            {showAllCourses ? "My Enrollments" : "Enrollments"}
          </button>
        )}
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
                    
                    {/* 只有FACULTY角色才能看到编辑和删除按钮 */}
                    {isFaculty && (
                      <>
                        <button onClick={(event) => {
                          event.preventDefault();
                          handleDeleteCourse(course._id);
                        }} className="btn btn-danger float-end"
                        id="wd-delete-course-click">
                          Delete
                        </button>
                        <button id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse({...course});
                          }}
                          className="btn btn-warning me-2 float-end">
                          Edit
                        </button>
                      </>
                    )}
                    
                    {/* 只有STUDENT角色才能看到注册和退订按钮 */}
                    {isStudent && (
                      isEnrolled(course._id) ? (
                        <button 
                          onClick={(e) => handleUnenrollCourse(course._id, e)} 
                          className="btn btn-danger float-end"
                        >
                          Unenroll
                        </button>
                      ) : (
                        <button 
                          onClick={(e) => handleEnrollCourse(course._id, e)} 
                          className="btn btn-success float-end"
                        >
                          Enroll
                        </button>
                      )
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