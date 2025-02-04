import { Form, Button } from "react-bootstrap";
import { BsCalendarEvent } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-4">
      <Form>
        <div className="mb-3">
          <Form.Label className="text-secondary">Assignment Name</Form.Label>
          <Form.Control type="text" value="A1 - ENV + HTML" />
        </div>

        <div className="mb-4">
          <Form.Control as="textarea" rows={10} value="The assignment is available online Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section Links to each of the Lab assignments Link to the Kambas application Links to all relevant source code repositories The Kanbas application should include a link to navigate back to the landing page." />
        </div>

        <div className="row mb-3">
          <div className="col-4 text-end">
            <Form.Label className="text-secondary">Points</Form.Label>
          </div>
          <div className="col-8">
            <Form.Control type="text" value="100" />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-4 text-end">
            <Form.Label className="text-secondary">Assignment Group</Form.Label>
          </div>
          <div className="col-8">
            <Form.Select>
              <option>ASSIGNMENTS</option>
              <option>QUIZZES</option>
              <option>EXAMS</option>
              <option>PROJECT</option>
            </Form.Select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-4 text-end">
            <Form.Label className="text-secondary">Display Grade as</Form.Label>
          </div>
          <div className="col-8">
            <Form.Select>
              <option>Percentage</option>
              <option>Letter</option>
              <option>Pass/Fail</option>
            </Form.Select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-4 text-end">
            <Form.Label className="text-secondary">Submission Type</Form.Label>
          </div>
          <div className="col-8">
            <div className="border rounded p-3">
              <Form.Select className="mb-3">
                <option>Online</option>
                <option>In-person</option>
              </Form.Select>

              <Form.Label className="fw-bold">Online Entry Options</Form.Label>
              <div className="mt-2">
                <Form.Check type="checkbox" label="Text Entry" className="mb-2" />
                <Form.Check type="checkbox" label="Website URL" className="mb-2" defaultChecked />
                <Form.Check type="checkbox" label="Media Recordings" className="mb-2" />
                <Form.Check type="checkbox" label="Student Annotation" className="mb-2" />
                <Form.Check type="checkbox" label="File Uploads" className="mb-2" />
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-4 text-end">
            <Form.Label className="text-secondary">Assign</Form.Label>
          </div>
          <div className="col-8">
            <div className="border rounded p-3">
              <div className="mb-3">
                <Form.Label>Assign to</Form.Label>
                <div className="d-flex align-items-center border rounded p-1 mt-1" style={{ width: "fit-content" }}>
                  <span>Everyone</span>
                  <IoMdClose className="ms-2" />
                </div>
              </div>

              <div className="mb-3">
                <Form.Label>Due</Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control type="text" value="May 13, 2024, 11:59 PM" className="me-1" />
                  <BsCalendarEvent />
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <Form.Label>Available from</Form.Label>
                  <div className="d-flex align-items-center">
                    <Form.Control type="text" value="May 6, 2024, 12:00 AM" className="me-1" />
                    <BsCalendarEvent />
                  </div>
                </div>
                <div className="col-6">
                  <Form.Label>Until</Form.Label>
                  <div className="d-flex align-items-center">
                    <Form.Control type="text" value="May 20, 2024, 11:59 PM" className="me-1" />
                    <BsCalendarEvent />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />
        <div className="text-end">
          <Button variant="secondary" size="lg" className="me-2">Cancel</Button>
          <Button variant="danger" size="lg">Save</Button>
        </div>
      </Form>
    </div>
  );
}
