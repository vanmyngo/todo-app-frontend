import { fetchAuthSession } from "aws-amplify/auth";

export const AddTodoForm = () => {
    async function handleAddTodo(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        // Retrieve task name
        const task = String(new FormData(event.currentTarget).get("task") ?? "").trim();
        console.log("event.currentTarget:", event.currentTarget);
        if (!task) {
            console.error("[AddTodoForm.tsx] Task is required.");
            return;
        }

        // Retrieve token
        const { tokens } = await fetchAuthSession();
        const idToken = tokens?.idToken?.toString().trim();
        if (!idToken) {
            console.error("[AddTodoForm.tsx] No ID token available.");
            return;
        }

        const response = await fetch(import.meta.env.VITE_API_URL + "/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify({ task }),
        });

        if (!response.ok) {
            console.error("[src/components/AddTodoForm.tsx] Failed to add todo.");
        }
    }

    return(
        <form id="add-todo-form" aria-label="Add todo item form" onSubmit={handleAddTodo}>
            <input 
                name="task" 
                type="text" 
                aria-label="Add todo item input" 
                placeholder="Add an item (i.e. Buy milk)"
            />
            <button type="submit" aria-label="Add todo item button">+</button>
        </form>
    );
}