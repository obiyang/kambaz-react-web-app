import { useEffect, useState } from "react";
import { FaUserCircle, FaCheck, FaPen } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import * as client from "../../Account/client";
import { FormControl, Form } from "react-bootstrap";
import { useSelector } from "react-redux";

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
  
  // 获取当前登录用户
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  // 检查当前用户是否为ADMIN
  const isAdmin = currentUser?.role === "ADMIN";
  
  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
    setEmail(user.email || "");
    setRole(user.role || "");
  };
  
  const deleteUser = async (userId: string) => {
    // 只有ADMIN才能删除用户
    if (!isAdmin) {
      alert("只有管理员可以删除用户");
      return;
    }
    
    if (window.confirm("Are you sure you want to delete this user?")) {
      await client.deleteUser(userId);
      navigate(-1);
    }
  };
  
  const saveUser = async () => {
    // 只有ADMIN才能保存用户信息
    if (!isAdmin) {
      alert("只有管理员可以编辑用户信息");
      return;
    }
    
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    navigate(-1);
  };
  
  const saveEmail = async () => {
    // 只有ADMIN才能保存邮箱
    if (!isAdmin) {
      alert("只有管理员可以编辑用户邮箱");
      return;
    }
    
    const updatedUser = { ...user, email };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditingEmail(false);
  };
  
  const saveRole = async () => {
    // 只有ADMIN才能保存角色
    if (!isAdmin) {
      alert("只有管理员可以编辑用户角色");
      return;
    }
    
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
        {!editing && isAdmin && (
          <FaPen onClick={() => setEditing(true)}
              className="float-end fs-5 mt-2 wd-edit" /> )}
        {editing && isAdmin && (
          <FaCheck onClick={() => saveUser()}
              className="float-end fs-5 mt-2 me-2 wd-save" /> )}
        {!editing && (
          <div className={`wd-name ${isAdmin ? "cursor-pointer" : ""}`}
               onClick={() => isAdmin && setEditing(true)}>
            {user.firstName} {user.lastName}</div>)}
        {user && editing && isAdmin && (
          <FormControl className="w-50 wd-edit-name"
            defaultValue={`${user.firstName} ${user.lastName}`}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { saveUser(); }}}/>)}
      </div>
      
      <div className="mt-3">
        <b>Roles:</b>
        {!editingRole && isAdmin && (
          <FaPen onClick={() => setEditingRole(true)}
              className="float-end fs-5 wd-edit-role" /> )}
        {editingRole && isAdmin && (
          <FaCheck onClick={() => saveRole()}
              className="float-end fs-5 me-2 wd-save-role" /> )}
        {!editingRole && (
          <span className={`wd-roles ${isAdmin ? "cursor-pointer" : ""}`}
                onClick={() => isAdmin && setEditingRole(true)}>
            {user.role}
          </span>
        )}
        {editingRole && isAdmin && (
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
        {!editingEmail && isAdmin && (
          <FaPen onClick={() => setEditingEmail(true)}
              className="float-end fs-5 wd-edit-email" /> )}
        {editingEmail && isAdmin && (
          <FaCheck onClick={() => saveEmail()}
              className="float-end fs-5 me-2 wd-save-email" /> )}
        {!editingEmail && (
          <span className={`wd-email ${isAdmin ? "cursor-pointer" : ""}`}
                onClick={() => isAdmin && setEditingEmail(true)}>
            {user.email || "N/A"}
          </span>
        )}
        {editingEmail && isAdmin && (
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
      {isAdmin && (
        <>
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
        </>
      )}
      {!isAdmin && (
        <button 
          onClick={() => navigate(-1)}
          className="btn btn-secondary float-end wd-back"
        >
          Back
        </button>
      )}
    </div>
  );
}
