import Modules from "../Modules";
import CourseStatus from "./Status";

export default function Home() {
  return (
    <div id="wd-home" className="d-flex">
      {/* Modules section - 后压缩 */}
      <div className="flex-grow-1 flex-shrink-0" style={{ minWidth: "600px" }}>
        <Modules />
      </div>
      {/* Course Status section - 先压缩 */}
      <div className="d-none d-xl-block" style={{ width: "300px", minWidth: "200px" }}>
        <CourseStatus />
      </div>
    </div>
  );
}
