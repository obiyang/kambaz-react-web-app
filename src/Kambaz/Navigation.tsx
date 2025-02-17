import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { NavLink, useLocation } from "react-router-dom";

export default function KambazNavigation() {
  const { pathname } = useLocation();

  const links = [
    { id: "wd-account-link", label: "Account", path: "/Kambaz/Account", icon: FaRegCircleUser, active: "Account" },
    { id: "wd-dashboard-link", label: "Dashboard", path: "/Kambaz/Dashboard", icon: AiOutlineDashboard, active: "Dashboard" },
    { id: "wd-course-link", label: "Courses", path: "/Kambaz/Dashboard", icon: LiaBookSolid, active: "Courses" },
    { id: "wd-calendar-link", label: "Calendar", path: "/Kambaz/Calendar", icon: IoCalendarOutline, active: "Calendar" },
    { id: "wd-inbox-link", label: "Inbox", path: "/Kambaz/Inbox", icon: FaInbox, active: "Inbox" },
    { id: "wd-labs-link", label: "Labs", path: "/Labs", icon: LiaCogSolid, active: "Labs" }
  ];

  const currentActive = links.find(link => 
    pathname.includes(link.path) && 
    (link.path !== "/Kambaz/Dashboard" || link.label === "Dashboard")
  )?.active || "";

  return (
    <div id="wd-kambaz-navigation" 
         style={{ width: 110 }}
         className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">
      <a id="wd-neu-link" 
         target="_blank"
         href="https://www.northeastern.edu/"
         className="list-group-item bg-black border-0 text-center">
        <img src="/images/NEU.jpg" width="75px" />
      </a>
      {links.map((link) => (
        <div key={link.id}>
          <br />
          <NavLink 
            to={link.path}
            id={link.id}
            className={`list-group-item text-center border-0 d-flex flex-column align-items-center p-2 ${
              currentActive === link.active ? 'bg-white text-danger' : 'bg-black text-white'
            }`}>
            <link.icon className={`fs-1 mb-1 ${
              link.label === 'Account' 
                ? currentActive === link.active ? 'text-danger' : 'text-white'
                : 'text-danger'
            }`} />
            {link.label}
          </NavLink>
        </div>
      ))}
    </div>
  );
}
