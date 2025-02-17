import { Link, useParams } from "react-router-dom";
import { FaSearch, FaPlus, FaEllipsisV, FaCheckCircle } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import { MdAssignment } from "react-icons/md";
import * as db from "../../Database";

interface Assignment {
  _id: string;
  title: string;
  course: string;
}

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments as Assignment[];
  const courseAssignments = assignments.filter((assignment) => assignment.course === cid);

  return (
    <div id="wd-assignments" className="p-2">
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
        <div>
          <button id="wd-add-assignment-group" className="btn btn-light me-2">
            <FaPlus className="me-1" />Group
          </button>
          <button id="wd-add-assignment" className="btn btn-danger">
            <FaPlus className="me-1" />Assignment
          </button>
        </div>
      </div>

      {/* Assignments Header */}
      <div className="d-flex align-items-center bg-secondary p-3 ps-2 mb-3 fs-5">
        <div className="d-flex align-items-center flex-grow-1">
          <BsGripVertical className="me-2 fs-3" />
          <h3 id="wd-assignments-title" className="mb-0">ASSIGNMENTS</h3>
          <span className="text-dark ms-auto me-2 border border-dark rounded-pill px-2 py-1">40% of Total</span>
          <FaPlus className="me-2 text-dark fs-5" />
          <FaEllipsisV className="text-dark fs-5" />
        </div>
      </div>

      {/* Assignments List */}
      <ul id="wd-assignment-list" className="list-unstyled border-start border-success border-4 ps-1 fs-5">
        {courseAssignments.map((assignment) => (
          <li key={assignment._id} className="wd-assignment-item mb-3">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <MdAssignment className="me-2 text-success fs-3" />
              <div className="flex-grow-1">
                <Link 
                  to={assignment._id} 
                  className="wd-assignment-link mb-1 d-block"
                >
                  {assignment.title}
                </Link>
                <div className="d-flex align-items-center text-secondary fs-6">
                  <span className="text-danger">Multiple Modules</span>
                  <span className="mx-2">|</span>
                  <span>Not available until May 6 at 12:00am</span>
                </div>
                <div className="text-secondary fs-6">
                  Due May 13 at 11:59pm | 100 pts
                </div>
              </div>
              <div className="d-flex align-items-center me-4">
                <FaCheckCircle className="text-success me-3 fs-5" />
                <FaEllipsisV className="text-dark fs-5" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
