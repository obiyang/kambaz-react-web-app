import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { Form, Button, FormControl } from "react-bootstrap";

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const signup = async () => {
    try {
      console.log("Attempting to sign up with:", user);
      console.log("API URL:", `${client.USERS_API}/signup`);
      
      const currentUser = await client.signup(user);
      console.log("Sign up response:", currentUser);
      
      if (!currentUser) {
        setError("No response from server");
        return;
      }
      
      dispatch(setCurrentUser(currentUser));
      navigate("/Kambaz/Account/Profile");
    } catch (error: any) {
      console.error("Sign up error:", error);
      setError(error.response?.data?.message || "Error signing up. Please try again.");
    }
  };
  
  return (
    <div className="wd-signup-screen p-4">
      <h1 className="mb-4">Sign up</h1>
      {error && (
        <div className="alert alert-danger mb-3">{error}</div>
      )}
      <Form>
        <Form.Group className="mb-3">
          <FormControl 
            value={user.username || ""} 
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="wd-username form-control-lg" 
            placeholder="username" 
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <FormControl 
            value={user.password || ""} 
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="wd-password form-control-lg" 
            placeholder="password" 
            type="password"
          />
        </Form.Group>
        
        <Button 
          onClick={signup} 
          className="wd-signup-btn btn-primary mb-3 w-100"
          size="lg"
        >
          Sign up
        </Button>
        
        <div className="text-center">
          <Link to="/Kambaz/Account/Signin" className="wd-signin-link text-primary text-decoration-none">
            Sign in
          </Link>
        </div>
      </Form>
    </div>
  );
}