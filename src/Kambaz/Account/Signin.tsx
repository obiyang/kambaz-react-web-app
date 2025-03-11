import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as db from "../Database";

export default function Signin() {
  const [credentials, setCredentials] = useState<{username: string, password: string}>({
    username: "",
    password: ""
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const signin = () => {
    const user = db.users.find(
      (u: any) => u.username === credentials.username && u.password === credentials.password);
    if (!user) return;
    dispatch(setCurrentUser(user));
    navigate("/Kambaz/Dashboard");
  };
  
  return (
    <div className="p-4">
      <h1 className="mb-4">Signin</h1>
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
