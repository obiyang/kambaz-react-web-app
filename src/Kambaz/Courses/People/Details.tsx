import { useEffect, useState } from "react";
import { FaUserCircle, FaCheck, FaPen } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import * as client from "../../Account/client";
import { FormControl, Form } from "react-bootstrap";

export default function PeopleDetails() {
  const { uid } = useParams();
  const [user, setUser] = useState<any>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editing, setEditing] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingRole, setEditingRole] = useState(false);
  const navigate = useNavigate();
  
  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
    setEmail(user.email || "");
    setRole(user.role || "");
  };
  
  const deleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await client.deleteUser(userId);
      navigate(-1);
    }
  };
  
  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    navigate(-1);
  };
  
  const saveEmail = async () => {
    const updatedUser = { ...user, email };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditingEmail(false);
  };
  
  const saveRole = async () => {
    const updatedUser = { ...user, role };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditingRole(false);
  };
  
  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);
  
  if (!uid) return null;
  
  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button onClick={() => navigate(-1)} className="btn position-fixed end-0 top-0 wd-close-details">
        <IoCloseSharp className="fs-1" />
      </button>
      <button onClick={() => navigate(-1)} className="btn position-fixed start-0 top-0 wd-close-details-left">
        <IoCloseSharp className="fs-1" />
      </button>
      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />
      <div className="text-danger fs-4">
        {!editing && (
          <FaPen onClick={() => setEditing(true)}
              className="float-end fs-5 mt-2 wd-edit" /> )}
        {editing && (
          <FaCheck onClick={() => saveUser()}
              className="float-end fs-5 mt-2 me-2 wd-save" /> )}
        {!editing && (
          <div className="wd-name"
               onClick={() => setEditing(true)}>
            {user.firstName} {user.lastName}</div>)}
        {user && editing && (
          <FormControl className="w-50 wd-edit-name"
            defaultValue={`${user.firstName} ${user.lastName}`}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { saveUser(); }}}/>)}
      </div>
      
      <div className="mt-3">
        <b>Roles:</b>
        {!editingRole && (
          <FaPen onClick={() => setEditingRole(true)}
              className="float-end fs-5 wd-edit-role" /> )}
        {editingRole && (
          <FaCheck onClick={() => saveRole()}
              className="float-end fs-5 me-2 wd-save-role" /> )}
        {!editingRole && (
          <span className="wd-roles"
                onClick={() => setEditingRole(true)}>
            {user.role}
          </span>
        )}
        {editingRole && (
          <Form.Select 
            className="mt-1 w-50 wd-edit-role-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { saveRole(); }}}>
            <option value="STUDENT">STUDENT</option>
            <option value="FACULTY">FACULTY</option>
            <option value="ADMIN">ADMIN</option>
          </Form.Select>
        )}
      </div>
      <br />
      
      <div>
        <b>Email:</b>
        {!editingEmail && (
          <FaPen onClick={() => setEditingEmail(true)}
              className="float-end fs-5 wd-edit-email" /> )}
        {editingEmail && (
          <FaCheck onClick={() => saveEmail()}
              className="float-end fs-5 me-2 wd-save-email" /> )}
        {!editingEmail && (
          <span className="wd-email"
                onClick={() => setEditingEmail(true)}>
            {user.email || "N/A"}
          </span>
        )}
        {editingEmail && (
          <FormControl 
            type="email"
            className="mt-1 w-75 wd-edit-email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { saveEmail(); }}}/>
        )}
      </div>
      <br />
      
      <b>Login ID:</b>
      <span className="wd-login-id">{user.loginId}</span>
      <br />
      <b>Section:</b>
      <span className="wd-section">{user.section}</span>
      <br />
      <b>Total Activity:</b>
      <span className="wd-total-activity">{user.totalActivity}</span>
      
      <hr />
      <button 
        onClick={() => deleteUser(uid as string)} 
        className="btn btn-danger float-end wd-delete"
      >
        Delete
      </button>
      <button 
        onClick={() => navigate(-1)}
        className="btn btn-secondary float-start float-end me-2 wd-cancel"
      >
        Cancel
      </button>
    </div>
  );
}
