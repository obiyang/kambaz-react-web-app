import axios from "axios";
import { axiosWithCredentials } from "../Account/client";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const API_BASE = `${REMOTE_SERVER}/api`;

// 获取所有注册记录
export const findAllEnrollments = async () => {
  const response = await axios.get(`${API_BASE}/enrollments`);
  return response.data;
};

// 根据用户ID获取注册记录
export const findEnrollmentsByUser = async (userId: string) => {
  const response = await axios.get(`${API_BASE}/users/${userId}/enrollments`);
  return response.data;
};

// 根据课程ID获取注册记录
export const findEnrollmentsByCourse = async (courseId: string) => {
  const response = await axios.get(`${API_BASE}/courses/${courseId}/enrollments`);
  return response.data;
};

// 检查用户是否已注册课程
export const isUserEnrolledInCourse = async (userId: string, courseId: string) => {
  const response = await axios.get(`${API_BASE}/users/${userId}/courses/${courseId}/enrolled`);
  return response.data.enrolled;
};

// 注册用户到课程
export const enrollUserInCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.post(`${API_BASE}/users/${userId}/courses/${courseId}/enroll`);
  return response.data;
};

// 取消用户课程注册
export const unenrollUserFromCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.delete(`${API_BASE}/users/${userId}/courses/${courseId}/enroll`);
  return response.data;
};