import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

interface Todo {
  id: string;
  title: string;
}

export default function TodoItem({ todo }: { todo: Todo }) {
  const dispatch = useDispatch();
  return (
    <div className="d-flex p-2 border-bottom align-items-center">
      <div style={{ width: "50%" }}>{todo.title}</div>
      <div style={{ marginLeft: "10px" }}>
        <Button 
          variant="primary" 
          className="me-2"
          onClick={() => dispatch(setTodo(todo))}
          id="wd-set-todo-click">
          Edit
        </Button>
        <Button 
          variant="danger"
          onClick={() => dispatch(deleteTodo(todo.id))}
          id="wd-delete-todo-click">
          Delete
        </Button>
      </div>
    </div>
  );
}