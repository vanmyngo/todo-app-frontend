import { TbTrash } from "react-icons/tb";
import type { Todo } from "./types";

interface TodoItemProps {
    todo: Todo;
    onToggle: (todo: Todo) => void;
}

export const TodoItem = ({ todo, onToggle }: TodoItemProps ) => {
    return (
        <div className="todo-item">
            <div>
                <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo)}/>
                <button type="button" aria-label="Delete todo item">
                    { !todo.completed && <TbTrash /> }
                </button>
            </div>
            <p className={`todo-tasks ${todo.completed ? "completed" : ""}`}>{todo.task}</p>
        </div>
    );
}