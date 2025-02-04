import { NavLink } from "react-router-dom";

export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      <NavLink 
        to="/Kambaz/Account/Signin"
        id="wd-account-signin-link"
        className={({ isActive }) => `list-group-item ${isActive ? 'active' : 'text-danger'} border border-0`}
      >
        Signin
      </NavLink>

      <NavLink 
        to="/Kambaz/Account/Signup"
        id="wd-account-signup-link"
        className={({ isActive }) => `list-group-item ${isActive ? 'active' : 'text-danger'} border border-0`}
      >
        Signup
      </NavLink>

      <NavLink 
        to="/Kambaz/Account/Profile"
        id="wd-account-profile-link"
        className={({ isActive }) => `list-group-item ${isActive ? 'active' : 'text-danger'} border border-0`}
      >
        Profile
      </NavLink>
    </div>
  );
}
