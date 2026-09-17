import { TodoItem } from "./TodoItem"
import type { Todo } from "./types"

export const TodoList = ({ 
    todos, 
    onToggle,
}: { 
    todos: Todo[]; 
    onToggle: (todo: Todo) => void; 
}) => {
    return (
        <div id="todo-list">
            {todos.map((todo) => (
                <TodoItem 
                    key={todo.taskId} 
                    todo={todo} 
                    onToggle={onToggle}
                />
            ))}
        </div>
    )
}