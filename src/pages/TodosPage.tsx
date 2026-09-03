import { useEffect, useState } from "react";
import type { Todo } from "../components/types";
import { TodoList } from "../components/TodoList";

export default function TodosPage() {  
  const [todos, setTodos] = useState<Todo[]>([]);
  
  useEffect(() => {
    async function fetchTodos() {
      const response = await fetch(import.meta.env.VITE_API_URL + "/todos");
      if (!response.ok) { 
        console.error("[src/pages/TodosPage.tsx] Failed to fetch todos.");
      }
      const data = await response.json();
      setTodos(data);
    }

    fetchTodos();
  }, []);

  return (
    <div>
      <h1>Todos</h1>
      <TodoList todos={todos} />
    </div>
  );
};