import { NavLink } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { useState } from "react";

export default function KambazNavigation() {
  const [selectedButton, setSelectedButton] = useState('dashboard');

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
      <br />
      <NavLink to="/Kambaz/Account" 
            id="wd-account-link"
            onClick={() => setSelectedButton('account')}
            className={`list-group-item text-center border-0 d-flex flex-column align-items-center p-2 ${
              selectedButton === 'account' ? 'bg-white text-danger' : 'bg-black text-white'
            }`}>
        <FaRegCircleUser className="fs-1 text-white mb-1" />
        Account
      </NavLink>
      <br />
      <NavLink to="/Kambaz/Dashboard" 
            id="wd-dashboard-link"
            onClick={() => setSelectedButton('dashboard')}
            className={`list-group-item text-center border-0 d-flex flex-column align-items-center p-2 ${
              selectedButton === 'dashboard' ? 'bg-white text-danger' : 'bg-black text-white'
            }`}>
        <AiOutlineDashboard className="fs-1 text-danger mb-1" />
        Dashboard
      </NavLink>
      <br />
      <NavLink to="/Kambaz/Dashboard" 
            id="wd-course-link"
            onClick={() => setSelectedButton('courses')}
            className={`list-group-item text-center border-0 d-flex flex-column align-items-center p-2 ${
              selectedButton === 'courses' ? 'bg-white text-danger' : 'bg-black text-white'
            }`}>
        <LiaBookSolid className="fs-1 text-danger mb-1" />
        Courses
      </NavLink>
      <br />
      <NavLink to="/Kambaz/Calendar" 
            id="wd-calendar-link"
            onClick={() => setSelectedButton('calendar')}
            className={`list-group-item text-center border-0 d-flex flex-column align-items-center p-2 ${
              selectedButton === 'calendar' ? 'bg-white text-danger' : 'bg-black text-white'
            }`}>
        <IoCalendarOutline className="fs-1 text-danger mb-1" />
        Calendar
      </NavLink>
      <br />
      <NavLink to="/Kambaz/Inbox" 
            id="wd-inbox-link"
            onClick={() => setSelectedButton('inbox')}
            className={`list-group-item text-center border-0 d-flex flex-column align-items-center p-2 ${
              selectedButton === 'inbox' ? 'bg-white text-danger' : 'bg-black text-white'
            }`}>
        <FaInbox className="fs-1 text-danger mb-1" />
        Inbox
      </NavLink>
      <br />
      <NavLink to="/Labs" 
            id="wd-labs-link"
            onClick={() => setSelectedButton('labs')}
            className={`list-group-item text-center border-0 d-flex flex-column align-items-center p-2 ${
              selectedButton === 'labs' ? 'bg-white text-danger' : 'bg-black text-white'
            }`}>
        <LiaCogSolid className="fs-1 text-danger mb-1" />
        Labs
      </NavLink>
    </div>
  );
}
