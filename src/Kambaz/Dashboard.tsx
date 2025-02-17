import { Link } from "react-router-dom";
import * as db from "./Database";
import { Row, Col, Card, Button } from "react-bootstrap";

export default function Dashboard() {
  const courses = db.courses;

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
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course) => (
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
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
