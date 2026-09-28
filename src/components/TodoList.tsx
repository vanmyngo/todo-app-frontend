import { TodoItem } from "./TodoItem"
import type { Todo } from "../utils/types"

export const TodoList = ({ 
    todos, 
    onToggle,
    onDelete,
    onEdit,
}: { 
    todos: Todo[]; 
    onToggle: (todo: Todo) => void; 
    onDelete: (todo: Todo) => void;
    onEdit: (todo: Todo, newTask: string) => Promise<void>;
}) => {
    return (
        <div id="todo-list">
            {todos.map((todo) => (
                <TodoItem 
                    key={todo.taskId} 
                    todo={todo} 
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </div>
    )
}