import { useEffect, useState } from "react";
import type { Todo } from "../components/types";
import { TodoList } from "../components/TodoList";
import { fetchAuthSession } from "aws-amplify/auth";
import { AddTodoForm } from "../components/AddTodoForm";
import { useNavigate } from "react-router-dom";
import { StreakCounter } from "../components/StreakCounter";
import { ProgressTracker } from "../components/ProgressTracker";

export default function TodosPage() {  
  const [todos, setTodos] = useState<Todo[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    async function fetchTodos() {
      // Retrieve auth token
      const { tokens } = await fetchAuthSession();
      const idToken = tokens?.idToken?.toString().trim();
      if (!idToken) {
        navigate("/login");
        return;
      }

      // Fetch todos
      const response = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      });

      // Console log error message
      if (!response.ok) { 
        const errorData = await response.json();
        const errorMessage = errorData.message ?? errorData.error;
        console.error("[src/pages/TodosPage.tsx] Failed to fetch todos:", errorMessage);
        return;
      }

      // Set valid todos
      const data = await response.json();
      setTodos(data);
    }

    fetchTodos();
  }, []);

  async function handleToggleTodoStatus(todo: Todo) {
    // Toggle current todo status
    const completed = !todo.completed;

    // Checkbox toggle on UI
    setTodos((currentTodos) =>
      currentTodos.map((currentTodo) =>
        currentTodo.taskId === todo.taskId 
          ? { ...currentTodo, completed }
          : currentTodo
      ) 
    );

    const { tokens } = await fetchAuthSession();
    const idToken = tokens?.idToken?.toString().trim();

    const response = await fetch(`${import.meta.env.VITE_API_URL}/todos/${todo.taskId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ completed }),
      }
    );

    // Rollback if fetch request fails
    if (!response.ok) {
      setTodos((currentTodos) => currentTodos.map((currentTodo) =>
        currentTodo.taskId === todo.taskId
          ? { ...currentTodo, completed: todo.completed }
          : currentTodo
        )
      );
    }
  };

  return (
    <div className="todo-grid-container">
      <h1 className="muted-text">Daily Tasks</h1>
      <AddTodoForm />
      {todos && <TodoList todos={todos} onToggle={handleToggleTodoStatus} />}
      <StreakCounter />
      <ProgressTracker />
    </div>
  );
};