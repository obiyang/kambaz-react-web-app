import { Link } from "react-router-dom";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments"
             id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list" style={{listStyle: "none", padding: 0}}>
        <li className="wd-assignment-list-item">
          <Link to="A1" className="wd-assignment-link" style={{color: "purple", textDecoration: "none", fontSize: "1.1em"}}>
            A1 - ENV + HTML
          </Link>
          <div>
            Multiple Modules | Not available until May 6 at 12:00am |
            Due May 13 at 11:59pm | 100 pts
          </div>
        </li>
        <li className="wd-assignment-list-item">
          <Link to="A2" className="wd-assignment-link" style={{color: "purple", textDecoration: "none", fontSize: "1.1em"}}>
            A2 - CSS + BOOTSTRAP
          </Link>
          <div>
            Multiple Modules | Not available until May 13 at 12:00am |
            Due May 20 at 11:59pm | 100 pts
          </div>
        </li>
        <li className="wd-assignment-list-item">
          <Link to="A3" className="wd-assignment-link" style={{color: "purple", textDecoration: "none", fontSize: "1.1em"}}>
            A3 - JAVASCRIPT + REACT
          </Link>
          <div>
            Multiple Modules | Not available until May 20 at 12:00am |
            Due May 27 at 11:59pm | 100 pts
          </div>
        </li>
      </ul>
    </div>
  );
}
