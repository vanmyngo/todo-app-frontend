export const AddTodoForm = ({ onAddTodo }: { onAddTodo: (task: String) => void}) => {
    // Handler to retrieve task
    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        // Retrieve task name
        const task = String(new FormData(event.currentTarget).get("task") ?? "").trim();
        if (!task) {
            console.error("[AddTodoForm.tsx] Task is required.");
            return;
        }

        // Return task name for backend API
        onAddTodo(task);
        event.currentTarget.reset();
    }

    return(
        <form id="add-todo-form" aria-label="Add todo item form" onSubmit={handleSubmit}>
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