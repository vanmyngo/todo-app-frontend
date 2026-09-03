import { TodoItem } from "./TodoItem"
import type { Todo } from "./types"

export const TodoList = ({ todos }: { todos: Todo[] }) => {
    return (
        <>
            {todos.map((todo) => <TodoItem key={todo.taskId} todo={todo} />)}
        </>
    )
}