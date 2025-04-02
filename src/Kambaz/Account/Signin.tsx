import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as client from "./client";

export default function Signin() {
  const [credentials, setCredentials] = useState<{username: string, password: string}>({
    username: "",
    password: ""
  });
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const signin = async () => {
    try {
      console.log("Attempting to sign in with:", credentials);
      console.log("API URL:", `${client.USERS_API}/signin`);
      
      const user = await client.signin(credentials);
      console.log("Sign in response:", user);
      
      if (!user) {
        setError("Invalid credentials or no response from server");
        return;
      }
      
      dispatch(setCurrentUser(user));
      navigate("/Kambaz/Dashboard");
    } catch (error: any) {
      console.error("Sign in error:", error);
      setError(error.response?.data?.message || "Error signing in. Please try again.");
    }
  };
  
  return (
    <div className="p-4">
      <h1 className="mb-4">Signin</h1>
      {error && (
        <div className="alert alert-danger mb-3">{error}</div>
      )}
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="username"
            className="form-control-lg"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="password"
            className="form-control-lg"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
        </Form.Group>

        <Button variant="primary" size="lg" className="w-100 mb-3" onClick={signin}>
          Signin
        </Button>

        <Link to="/Kambaz/Account/Signup" className="text-primary text-decoration-none">
          Signup
        </Link>
      </Form>
    </div>
  );
}
