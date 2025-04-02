import { Link, useParams, useNavigate } from "react-router-dom";
import { FaSearch, FaPlus, FaEllipsisV, FaCheckCircle, FaTrash } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import { MdAssignment } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment, setAssignments } from "./reducer";
import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
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

export default function Assignments() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  // State for delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);

  // Fetch assignments when component mounts or course ID changes
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        if (cid) {
          const assignments = await client.findAssignmentsForCourse(cid);
          dispatch(setAssignments(assignments));
        }
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };
    fetchAssignments();
  }, [cid, dispatch]);

  // Show delete confirmation modal
  const handleShowDeleteModal = (assignmentId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    setAssignmentToDelete(assignmentId);
    setShowDeleteModal(true);
  };

  // Confirm delete assignment
  const handleDeleteAssignment = async () => {
    if (assignmentToDelete) {
      try {
        await client.deleteAssignment(assignmentToDelete);
        dispatch(deleteAssignment(assignmentToDelete));
        setShowDeleteModal(false);
        setAssignmentToDelete(null);
      } catch (error) {
        console.error("Error deleting assignment:", error);
      }
    }
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setAssignmentToDelete(null);
  };

  // Navigate to assignment details
  const handleAssignmentClick = (assignmentId: string) => {
    navigate(`/Kambaz/Courses/${cid}/Assignments/${assignmentId}`);
  };

  return (
    <div id="wd-assignments" className="p-2">
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this assignment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteAssignment}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Search and Buttons Row */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="position-relative">
          <FaSearch className="position-absolute ms-2 text-secondary" style={{ top: "10px", opacity: 0.5 }} />
          <input
            id="wd-search-assignment"
            type="text"
            className="form-control ps-4"
            placeholder="Search..."
            style={{ width: "240px", backgroundColor: "white" }}
          />
        </div>

        {isFaculty && (
          <div>
            <button id="wd-add-assignment-group" className="btn btn-light me-2">
              <FaPlus className="me-1" />Group
            </button>
            <button 
              id="wd-add-assignment" 
              className="btn btn-danger"
              onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments/new`)}
            >
              <FaPlus className="me-1" />Assignment
            </button>
          </div>
        )}
      </div>

      {/* Assignments Header */}
      <div className="d-flex align-items-center bg-secondary p-3 ps-2 mb-3 fs-5">
        <div className="d-flex align-items-center flex-grow-1">
          <BsGripVertical className="me-2 fs-3" />
          <h3 id="wd-assignments-title" className="mb-0">ASSIGNMENTS</h3>
          <span className="text-dark ms-auto me-2 border border-dark rounded-pill px-2 py-1">40% of Total</span>
          
          {isFaculty && (
            <>
              <FaPlus className="me-2 text-dark fs-5" />
              <FaEllipsisV className="text-dark fs-5" />
            </>
          )}
        </div>
      </div>

      {/* Assignments List */}
      <ul id="wd-assignment-list" className="list-unstyled border-start border-success border-4 ps-1 fs-5">
        {assignments.map((assignment: Assignment) => (
          <li key={assignment._id} className="wd-assignment-item mb-3">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <MdAssignment className="me-2 text-success fs-3" />
              <div className="flex-grow-1">
                {isFaculty ? (
                  <Link 
                    to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`} 
                    className="wd-assignment-link mb-1 d-block"
                  >
                    {assignment.title}
                  </Link>
                ) : (
                  <span className="mb-1 d-block">{assignment.title}</span>
                )}
                <div className="d-flex align-items-center text-secondary fs-6">
                  <span className="text-danger">Multiple Modules</span>
                  <span className="mx-2">|</span>
                  <span>
                    {assignment.availableFromDate 
                      ? `Not available until ${assignment.availableFromDate}` 
                      : "Not available until May 6 at 12:00am"}
                  </span>
                </div>
                <div className="text-secondary fs-6">
                  {assignment.dueDate ? `Due ${assignment.dueDate}` : "Due May 13 at 11:59pm"} | 
                  {assignment.points ? `${assignment.points} pts` : "100 pts"}
                </div>
              </div>
              <div className="d-flex align-items-center me-4">
                <FaCheckCircle className="text-success me-3 fs-5" />
                
                {isFaculty && (
                  <>
                    <FaTrash 
                      className="text-danger me-2 fs-5" 
                      onClick={(e) => handleShowDeleteModal(assignment._id, e)}
                      style={{ cursor: 'pointer' }}
                    />
                    <FaEllipsisV className="text-dark fs-5" />
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
