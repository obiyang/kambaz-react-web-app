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
  
  // Check if current user has FACULTY role
  const isFaculty = currentUser?.role === "FACULTY";
  
  // Check if current user has STUDENT role
  const isStudent = currentUser?.role === "STUDENT";
  
  // State for showing all courses or only enrolled courses
  const [showAllCourses, setShowAllCourses] = useState(isFaculty ? true : false);
  
  // Local state only keeps the currently edited course
  const [course, setCourse] = useState({
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
    if (isStudent && !isEnrolled(courseId)) {
      event.preventDefault();
      // Student not enrolled in this course, prevent navigation
      return;
    }
    // Normal navigation for other cases
    navigate(`/Kambaz/Courses/${courseId}/Home`);
  };

  // Select courses to display based on display mode
  const displayedCourses = showAllCourses 
    ? courses 
    : courses.filter((course: any) => isEnrolled(course._id));

  const handleAddNewCourse = () => {
    // Create a new course object without the _id field
    const { _id, ...newCourse } = course; // Use object destructuring to exclude _id
    
    // Dispatch the action with the new course
    dispatch(addCourse(newCourse));
    
    // Add debug information
    console.log("Adding new course:", newCourse);
    console.log("Current courses:", courses);
    
    // Reset form after adding
    setCourse({
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
    
    // Faculty users already see all courses by default
  };

  const handleDeleteCourse = (courseId: string) => {
    dispatch(deleteCourse(courseId));
  };

  const handleUpdateCourse = () => {
    dispatch(updateCourse(course));
  };

  // Toggle between showing all courses or only enrolled courses
  const toggleCourseDisplay = () => {
    setShowAllCourses(!showAllCourses);
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      
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
        
        {/* Only STUDENT role can see the Enrollments button */}
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
                            setCourse({...course});
                          }}
                          className="btn btn-warning me-2 float-end">
                          Edit
                        </button>
                      </>
                    )}
                    
                    {/* Only STUDENT role can see enroll and unenroll buttons */}
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