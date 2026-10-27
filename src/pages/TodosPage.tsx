import { useEffect, useState } from "react";
import { STATUS_OPTIONS, DAYS_OPTIONS, type Todo } from "../utils/types";
import { TodoList } from "../components/TodoList";
import { TodayDate } from "../components/TodayDate.tsx";
import { fetchAuthSession } from "aws-amplify/auth";
import { AddTodoForm } from "../components/AddTodoForm";
import { useNavigate } from "react-router-dom";
import { ProgressTracker } from "../components/ProgressTracker";
import { Dropdown } from "../components/FilterDropdown.tsx";

export default function TodosPage() {  
  const [todos, setTodos] = useState<Todo[]>([]);
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");
  const [completedWithin, setCompletedWithin] = useState("7");
  
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

  // Handler for toggling todo status
  async function handleToggleTodoStatus(todo: Todo) {
    // Toggle current todo status
    const completed = !todo.completed;

    // Retrieve auth token
    const { tokens } = await fetchAuthSession();
    const idToken = tokens?.idToken?.toString().trim();

    // Update task completed field on backend
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

    // Update todo
    if (response.ok) {
      const updatedTodo: Todo = await response.json();
      setTodos((currentTodos) => 
        currentTodos.map((currentTodo) => 
          currentTodo.taskId === todo.taskId ? updatedTodo : currentTodo
      ))
    }
  }

  // Handler for deleting todo
  async function handleDeleteTodo(todo: Todo) {
    // Remove selected todo from frontend
    setTodos((currentTodos) => 
      currentTodos.filter((currentTodo) => currentTodo.taskId !== todo.taskId));

    // Retrieve auth token
    const { tokens } = await fetchAuthSession();
    const idToken = tokens?.idToken?.toString().trim();
    
    // Remove selected todo from backend
    const response = await fetch(`${import.meta.env.VITE_API_URL}/todos/${todo.taskId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    // Rollback
    if (!response.ok) {
      setTodos((currentTodos) => [...currentTodos, todo]);
    }
  }

  // Handler for adding todo
  async function handleAddTodo(task: string) {
    // Retrieve auth token
    const { tokens } = await fetchAuthSession();
    const idToken = tokens?.idToken?.toString().trim();
    if (!idToken) {
      console.error("[AddTodoForm.tsx] No ID token available.");
      return;
    }

    // Add new todo to backend
    const response = await fetch(import.meta.env.VITE_API_URL + "/todos", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ task }),
    });

    if (!response.ok) {
        console.error("[AddTodoForm.tsx] Failed to add todo.");
        return;
    }

    // Add todo at top of list
    const newTodo: Todo = await response.json();
    setTodos((currentTodos) => [newTodo, ...currentTodos]);
  }

  // Handler for editing todo
  async function handleEditTodo(todo: Todo, newTask: string) {
    // Retrieve auth token
    const { tokens } = await fetchAuthSession();
    const idToken = tokens?.idToken?.toString().trim();
    if (!idToken) return;

    // Send the updated task to the API.
    const response = await fetch(`${import.meta.env.VITE_API_URL}/todos/${todo.taskId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ task: newTask }),
      }
    );

    // Pass API errors back to the editor.
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(data?.message ?? data?.error ?? "Could not update the task.");
    }

    // Update the local list after the API confirms the edit.
    setTodos((currentTodos) => 
      currentTodos.map((currentTodo) => 
        currentTodo.taskId === todo.taskId 
          ? {...currentTodo, task: newTask} 
          : currentTodo
      )
    );
  }

  // Filter todos based on status and completed date
  const cuttoffTime = Date.now() - Number(completedWithin) * 24 * 60 * 60 * 1000;
  const filteredTodos = todos.filter((todo) => {
    const matchesStatus = statusFilter === "all" 
      || (statusFilter === "active" && !todo.completed) 
      || (statusFilter === "completed" && todo.completed);
    const matchesDate = !todo.completed 
      || (completedWithin === "all")
      || (todo.completedDate && new Date(todo.completedDate).getTime() >= cuttoffTime);
    return matchesStatus && matchesDate;
  });

  return (
    <div className="todo-grid-container">
      <header className="todo-page-header">
        <h1 className="muted-text">Daily Tasks</h1>
        <div className="todo-header-summary">
          <TodayDate />
          <ProgressTracker todos={filteredTodos} />
        </div>
      </header>
      <main className="todo-task-column">
        <div className="task-filters">
          <Dropdown
            label="Status"
            value={statusFilter}
            options={STATUS_OPTIONS}
            onChange={setStatusFilter}
          />
          {statusFilter === "completed" &&
            <Dropdown
              label="Completed within"
              value={completedWithin}
              options={DAYS_OPTIONS}
              onChange={setCompletedWithin}
            />
          }
        </div>
        <AddTodoForm onAddTodo={handleAddTodo} />
        {filteredTodos && 
          <TodoList 
            todos={filteredTodos} 
            onToggle={handleToggleTodoStatus} 
            onDelete={handleDeleteTodo}
            onEdit={handleEditTodo}
          />
        }
      </main>
    </div>
  );
};