import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import * as courseClient from "../client";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import PeopleDetails from "./Details";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  loginId: string;
  section: string;
  role: string;
  lastActivity: string;
  totalActivity: string;
}

export default function PeopleTable({ users = [] }: { users?: any[] }) {
  const [localUsers, setLocalUsers] = useState<User[]>([]);
  const { cid, uid } = useParams(); // 获取当前课程ID和用户ID
  
  // 使用useEffect获取课程用户，并在依赖项中添加uid，确保在查看用户详情后返回时重新获取课程用户
  useEffect(() => {
    // If users are not provided, fetch them from the server
    if (cid) {
      const fetchUsers = async () => {
        try {
          // 使用findUsersForCourse函数获取特定课程的已注册用户
          const fetchedUsers = await courseClient.findUsersForCourse(cid);
          // 过滤掉null或undefined值
          const validUsers = fetchedUsers.filter(user => user && user._id);
          setLocalUsers(validUsers);
        } catch (error) {
          console.error("Error fetching users for course:", error);
        }
      };
      fetchUsers();
    } else if (users.length > 0) {
      // 过滤掉null或undefined值
      const validUsers = users.filter(user => user && user._id);
      setLocalUsers(validUsers);
    }
  }, [cid, uid, users]); // 添加uid作为依赖项，确保在查看用户详情后返回时重新获取课程用户

  // 格式化日期函数，去除ISO日期格式中的T和时间部分
  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "";
    
    try {
      // 如果是ISO格式的日期字符串（包含T和时区信息）
      if (dateString.includes('T')) {
        // 创建日期对象
        const date = new Date(dateString);
        
        // 检查日期是否有效
        if (isNaN(date.getTime())) return dateString;
        
        // 格式化为 "YYYY-MM-DD" 格式
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
      
      // 如果已经是简单格式，直接返回
      return dateString;
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  return (
    <div id="wd-people-table">
      <PeopleDetails />
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {localUsers && localUsers.length > 0 ? (
            localUsers.map((user) => (
              user && user._id ? (
                <tr key={user._id}>
                  <td className="wd-full-name text-nowrap">
                    <Link to={`/Kambaz/Courses/${cid}/People/${user._id}`} className="text-decoration-none">
                      <FaUserCircle className="me-2 fs-1 text-secondary" />
                      <span className="wd-first-name">{user.firstName}</span>{" "}
                      <span className="wd-last-name">{user.lastName}</span>
                    </Link>
                  </td>
                  <td className="wd-login-id">{user.loginId}</td>
                  <td className="wd-section">{user.section}</td>
                  <td className="wd-role">{user.role}</td>
                  <td className="wd-last-activity">{formatDate(user.lastActivity)}</td>
                  <td className="wd-total-activity">{user.totalActivity}</td>
                </tr>
              ) : null
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center">No users found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}