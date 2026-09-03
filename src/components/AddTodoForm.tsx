export const AddTodoForm = () => {
    async function handleAddTodo(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const task = document.getElementById("todo-input") as HTMLInputElement;
        const data = await fetch(import.meta.env.VITE_API_URL + "/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ task: task.value })
        });

        if (!data.ok) {
            console.error("[src/components/AddTodoForm.tsx] Failed to add todo.");
        }
    }

    return(
        <form id="add-todo-form" aria-label="Add todo item form" onSubmit={handleAddTodo}>
            <input id="todo-input" type="text" aria-label="Add todo item input" placeholder="Add an item (i.e. Buy milk)"/>
            <button id="todo-button" type="submit" aria-label="Add todo item button">+</button>
        </form>
    );
}