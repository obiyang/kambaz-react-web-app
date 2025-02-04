import { FaFileImport, FaHome, FaVideo, FaBullhorn, FaChartBar, FaBell } from "react-icons/fa";
import { BsFileEarmarkText } from "react-icons/bs";
import { FaBan } from "react-icons/fa";
import GreenCheckmark from "../../Courses/Modules/GreenCheckmark";

export default function CourseStatus() {
    return (
      <div id="wd-course-status" className="p-2">
        <h2>Course Status</h2>
        <div className="wd-button-group d-flex gap-2 mb-3">
          <button className="btn bg-secondary text-dark border-0 flex-grow-1 d-flex align-items-center justify-content-center">
            <FaBan className="text-dark me-1" />
            <span>Unpublish</span>
          </button>
          <button className="btn btn-success flex-grow-1 d-flex align-items-center justify-content-center">
            <GreenCheckmark variant="dark" />
            <span>Publish</span>
          </button>
        </div>
        <div className="wd-button-list d-flex flex-column gap-2">
          <button className="btn bg-secondary text-dark border-0 d-flex align-items-center text-start w-100 text-nowrap overflow-hidden text-truncate">
            <FaFileImport className="me-1 text-dark" />
            <span>Import Existing Content</span>
          </button>
          <button className="btn bg-secondary text-dark border-0 d-flex align-items-center text-start w-100 text-nowrap overflow-hidden text-truncate">
            <BsFileEarmarkText className="me-1 text-dark" />
            <span>Import from Commons</span>
          </button>
          <button className="btn bg-secondary text-dark border-0 d-flex align-items-center text-start w-100 text-nowrap overflow-hidden text-truncate">
            <FaHome className="me-1 text-dark" />
            <span>Choose Home Page</span>
          </button>
          <button className="btn bg-secondary text-dark border-0 d-flex align-items-center text-start w-100 text-nowrap overflow-hidden text-truncate">
            <FaVideo className="me-1 text-dark" />
            <span>View Course Stream</span>
          </button>
          <button className="btn bg-secondary text-dark border-0 d-flex align-items-center text-start w-100 text-nowrap overflow-hidden text-truncate">
            <FaBullhorn className="me-1 text-dark" />
            <span>New Announcement</span>
          </button>
          <button className="btn bg-secondary text-dark border-0 d-flex align-items-center text-start w-100 text-nowrap overflow-hidden text-truncate">
            <FaChartBar className="me-1 text-dark" />
            <span>New Analytics</span>
          </button>
          <button className="btn bg-secondary text-dark border-0 d-flex align-items-center text-start w-100 text-nowrap overflow-hidden text-truncate">
            <FaBell className="me-1 text-dark" />
            <span>View Course Notifications</span>
          </button>
        </div>
      </div>
    );
}