import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";

export default function Dashboard({ 
  courses, course, setCourse, addNewCourse, 
  deleteCourse, updateCourse 
}: { 
  courses: any[]; course: any; setCourse: (course: any) => void; 
  addNewCourse: () => void; deleteCourse: (courseId: string) => void; 
  updateCourse: () => void; 
}) {
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

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h5>New Course
          <button className="btn btn-primary float-end"
                  id="wd-add-new-course-click"
                  onClick={addNewCourse} > Add </button>
                  <button className="btn btn-warning float-end me-2"
                onClick={updateCourse} id="wd-update-course-click">
          Update
        </button>
      </h5><br />
      <FormControl value={course.name} className="mb-2"
             onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
      <FormControl value={course.description} rows={3}
             onChange={(e) => setCourse({ ...course, description: e.target.value }) } />
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link to={`/Kambaz/Courses/${course._id}/Home`}
                className="wd-dashboard-course-link text-decoration-none text-dark" >
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
                    <Button variant="primary"> Go </Button>
                    <button onClick={(event) => {
                      event.preventDefault();
                      deleteCourse(course._id);
                    }} className="btn btn-danger float-end"
                    id="wd-delete-course-click">
                    Delete
            </button>
            <button id="wd-edit-course-click"
  onClick={(event) => {
    event.preventDefault();
    setCourse({...course});
  }}
  className="btn btn-warning me-2 float-end" >
  Edit
</button>

                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
