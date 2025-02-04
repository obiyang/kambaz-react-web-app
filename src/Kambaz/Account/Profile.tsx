import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div className="p-4">
      <h1 className="mb-4">Profile</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="username"
            defaultValue="alice"
            className="form-control-lg"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="password"
            defaultValue="123"
            className="form-control-lg"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="First Name"
            defaultValue="Alice"
            className="form-control-lg"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Last Name"
            defaultValue="Wonderland"
            className="form-control-lg"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="date"
            placeholder="mm/dd/yyyy"
            className="form-control-lg"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="alice@wonderland.com"
            defaultValue="alice@wonderland"
            className="form-control-lg"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            as="select"
            className="form-control-lg"
            defaultValue="USER"
          >
            <option value="USER">User</option> 
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option> 
            <option value="STUDENT">Student</option>
          </Form.Control>
        </Form.Group>

        <Link to="/Kambaz/Account/Signin" >
          <Button variant="danger" size="lg" className="w-100">
            Sign out
          </Button>
        </Link>
      </Form>
    </div>
  );
}
