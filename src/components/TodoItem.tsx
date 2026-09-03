import { TbTrash } from "react-icons/tb";
import type { Todo } from "./types";

interface TodoItemProps {
    todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps ) => {
    return (
        <div className="todo-item">
            <input type="checkbox" checked={todo.completed} />
            <p>{todo.task}</p>
            <button type="button" aria-label="Delete todo item">
                { todo.completed && <TbTrash /> }
            </button>
        </div>
    );
}