import Modules from "../Modules";
import CourseStatus from "./Status";

export default function Home() {
  return (
    <div id="wd-home" className="row">
      <div className="col-9">
        <Modules />
      </div>
      <div className="col-3">
        <CourseStatus />
      </div>
    </div>
  );
}
