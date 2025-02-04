import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <div className="p-4">
      <h1 className="mb-4">Signin</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="username"
            className="form-control-lg"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="password"
            className="form-control-lg"
          />
        </Form.Group>

        <Button variant="primary" size="lg" className="w-100 mb-3">
          Signin
        </Button>

        <Link to="/Kambaz/Account/Signup" className="text-primary text-decoration-none">
          Signup
        </Link>
      </Form>
    </div>
  );
}
