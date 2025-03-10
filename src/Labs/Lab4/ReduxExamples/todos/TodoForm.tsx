import { Button, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <div className="d-flex p-2 border-bottom">
      <FormControl 
        className="me-2"
        style={{ width: "50%" }}
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
      />
      <div style={{ marginLeft: "10px" }}>
        <Button 
          variant="warning" 
          className="me-2"
          onClick={() => dispatch(updateTodo(todo))}
          id="wd-update-todo-click">
          Update
        </Button>
        <Button 
          variant="success"
          onClick={() => dispatch(addTodo(todo))}
          id="wd-add-todo-click">
          Add
        </Button>
      </div>
    </div>
  );
}