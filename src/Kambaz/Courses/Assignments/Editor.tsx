import { Form, Button } from "react-bootstrap";
import { BsCalendarEvent } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import * as client from "./client";

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
    const fetchAssignment = async () => {
      if (!isNewAssignment && aid) {
        try {
          const fetchedAssignment = await client.findAssignmentById(aid);
          setAssignment(fetchedAssignment);
        } catch (error) {
          console.error("Error fetching assignment:", error);
          // If assignment not found in API, try to find it in Redux store
          const foundAssignment = assignments.find((a: Assignment) => a._id === aid);
          if (foundAssignment) {
            setAssignment(foundAssignment);
          }
        }
      }
    };
    fetchAssignment();
  }, [aid, isNewAssignment, assignments]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAssignment({
      ...assignment,
      [name]: name === "points" ? parseInt(value) || 0 : value
    });
  };

  const handleCancel = () => {
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isNewAssignment) {
        // Create new assignment
        const newAssignment = await client.createAssignment(cid as string, assignment);
        dispatch(addAssignment(newAssignment));
      } else {
        // Update existing assignment
        const updatedAssignment = await client.updateAssignment(assignment);
        dispatch(updateAssignment(updatedAssignment));
      }
      navigate(`/Kambaz/Courses/${cid}/Assignments`);
    } catch (error) {
      console.error("Error saving assignment:", error);
    }
  };

  return (
    <div className="container-fluid mt-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{isNewAssignment ? "New Assignment" : "Edit Assignment"}</h2>
        <Button variant="outline-secondary" onClick={handleCancel}>
          <IoMdClose className="me-2" />
          Cancel
        </Button>
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={assignment.title}
            onChange={handleChange}
            placeholder="Enter assignment name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={assignment.description}
            onChange={handleChange}
            rows={4}
            placeholder="Enter assignment description"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <Form.Control
            type="number"
            name="points"
            value={assignment.points}
            onChange={handleChange}
            min="0"
            max="1000"
          />
        </Form.Group>

        <div className="row">
          <Form.Group className="col-md-4 mb-3">
            <Form.Label>
              <BsCalendarEvent className="me-2" />
              Due Date
            </Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              value={assignment.dueDate}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="col-md-4 mb-3">
            <Form.Label>
              <BsCalendarEvent className="me-2" />
              Available From
            </Form.Label>
            <Form.Control
              type="date"
              name="availableFromDate"
              value={assignment.availableFromDate}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="col-md-4 mb-3">
            <Form.Label>
              <BsCalendarEvent className="me-2" />
              Available Until
            </Form.Label>
            <Form.Control
              type="date"
              name="availableUntilDate"
              value={assignment.availableUntilDate}
              onChange={handleChange}
            />
          </Form.Group>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <Button variant="secondary" className="me-2" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" type="submit">
            {isNewAssignment ? "Create Assignment" : "Update Assignment"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
