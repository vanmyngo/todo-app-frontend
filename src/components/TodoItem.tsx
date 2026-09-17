import { TbTrash } from "react-icons/tb";
import type { Todo } from "./types";

export const TodoItem = ({ 
    todo, 
    onToggle, 
    onDelete,
}: {
    todo: Todo;
    onToggle: (todo: Todo) => void;
    onDelete: (todo: Todo) => void;
}) => {
    return (
        <div className="todo-item">
            <div>
                <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo)}/>
                {!todo.completed && (
                    <button 
                        type="button" 
                        aria-label="Delete todo item" 
                        onClick={() => onDelete(todo)}
                    >
                        <TbTrash />
                    </button>
                )}
            </div>
            <p className={`todo-tasks ${todo.completed ? "completed" : ""}`}>{todo.task}</p>
        </div>
    );
}