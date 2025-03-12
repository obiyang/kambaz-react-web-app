import { Form, Button } from "react-bootstrap";
import { BsCalendarEvent } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";

interface Assignment {
  _id: string;
  title: string;
  course: string;
  description?: string;
  points?: number;
  dueDate?: string;
  availableFromDate?: string;
  availableUntilDate?: string;
}

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  
  const isNewAssignment = aid === "new";
  
  const [assignment, setAssignment] = useState<Assignment>({
    _id: "",
    title: "",
    course: cid || "",
    description: "",
    points: 100,
    dueDate: "May 13, 2024, 11:59 PM",
    availableFromDate: "May 6, 2024, 12:00 AM",
    availableUntilDate: "May 20, 2024, 11:59 PM"
  });

  useEffect(() => {
    if (!isNewAssignment && assignments) {
      const existingAssignment = assignments.find((a: Assignment) => a._id === aid);
      if (existingAssignment) {
        setAssignment(existingAssignment);
      } else {
        // 如果找不到作业，导航回作业列表
        navigate(`/Kambaz/Courses/${cid}/Assignments`);
      }
    }
  }, [aid, cid, assignments, isNewAssignment, navigate]);

  const handleSave = () => {
    if (isNewAssignment) {
      dispatch(addAssignment(assignment));
    } else {
      dispatch(updateAssignment(assignment));
    }
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-4">
      <Form>
        <div className="mb-3">
          <Form.Label className="text-secondary">Assignment Name</Form.Label>
          <Form.Control 
            type="text" 
            value={assignment.title} 
            onChange={(e) => setAssignment({...assignment, title: e.target.value})}
          />
        </div>

        <div className="mb-4">
          <Form.Label className="text-secondary">Description</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={10} 
            value={assignment.description} 
            onChange={(e) => setAssignment({...assignment, description: e.target.value})}
          />
        </div>

        <div className="row mb-3">
          <div className="col-4 text-end">
            <Form.Label className="text-secondary">Points</Form.Label>
          </div>
          <div className="col-8">
            <Form.Control 
              type="number" 
              value={assignment.points} 
              onChange={(e) => setAssignment({...assignment, points: parseInt(e.target.value)})}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-4 text-end">
            <Form.Label className="text-secondary">Assignment Group</Form.Label>
          </div>
          <div className="col-8">
            <Form.Select defaultValue="ASSIGNMENTS">
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
            <Form.Select defaultValue="Percentage">
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
              <Form.Select className="mb-3" defaultValue="Online">
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
                  <Form.Control 
                    type="text" 
                    value={assignment.dueDate} 
                    className="me-1" 
                    onChange={(e) => setAssignment({...assignment, dueDate: e.target.value})}
                  />
                  <BsCalendarEvent />
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <Form.Label>Available from</Form.Label>
                  <div className="d-flex align-items-center">
                    <Form.Control 
                      type="text" 
                      value={assignment.availableFromDate} 
                      className="me-1" 
                      onChange={(e) => setAssignment({...assignment, availableFromDate: e.target.value})}
                    />
                    <BsCalendarEvent />
                  </div>
                </div>
                <div className="col-6">
                  <Form.Label>Until</Form.Label>
                  <div className="d-flex align-items-center">
                    <Form.Control 
                      type="text" 
                      value={assignment.availableUntilDate} 
                      className="me-1" 
                      onChange={(e) => setAssignment({...assignment, availableUntilDate: e.target.value})}
                    />
                    <BsCalendarEvent />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />
        <div className="text-end">
          <Button onClick={handleCancel} className="btn btn-secondary btn-lg me-2">
            Cancel
          </Button>
          <Button onClick={handleSave} className="btn btn-danger btn-lg">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
