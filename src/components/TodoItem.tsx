import { TbDeviceFloppy, TbEdit, TbTrash } from "react-icons/tb";
import type { Todo } from "../utils/types";
import { useEffect, useRef, useState } from "react";

/** Renders a todo and its controls. */
export const TodoItem = ({ 
    todo, 
    onToggle, 
    onDelete,
    onEdit,
}: {
    todo: Todo;
    onToggle: (todo: Todo) => void;
    onDelete: (todo: Todo) => void;
    onEdit: (todo: Todo, newTask: string) => Promise<void>;
}) => {
    // Track editing, draft text, and errors.
    const [isEditing, setIsEditing] = useState(false);
    const [task, setTask] = useState(todo.task);
    const [error, setError] = useState("");
    const taskInputRef = useRef<HTMLInputElement>(null);

    /** Focus on task input on edit. */
    useEffect(() => {
        if (isEditing) taskInputRef.current?.focus();
    }, [isEditing]);

    /** Cancels edits and toggles completion. */
    function handleToggle() {
        // Reset the draft when leaving edit mode.
        if (isEditing) {
            setTask(todo.task);
            setIsEditing(false);
            setError("");
        }

        // Notify the parent of the toggle.
        onToggle(todo);
    }

    /** Saves a non-empty task and reports failures. */
    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        // Prevent page navigation or reloading.
        event.preventDefault();

        // Trim and validate the draft.
        const newTask = task.trim();
        if (!newTask) return;

        // Clear stale errors.
        setError("");

        // Save, then exit edit mode.
        try {
            await onEdit(todo, newTask);
            setIsEditing(false);
        } catch (error) {
            // Show the save error.
            setError(error instanceof Error ? error.message : "Could not update task.");
        }
    }

    return (
        <div className="todo-item">
            <div className="todo-item-display">
                {/* Completion and item actions. */}
                <input 
                    type="checkbox" 
                    title={todo.completed ? "Mark incomplete" : "Mark complete"}
                    checked={todo.completed} 
                    onChange={handleToggle}/>
                {!todo.completed && (
                    <button 
                        type="button"
                        title="Delete" 
                        aria-label="Delete todo item" 
                        onClick={() => onDelete(todo)}
                    >
                        <TbTrash />
                    </button>
                )}
                {!isEditing && !todo.completed && 
                    <button 
                        type="button" 
                        title="Edit"
                        aria-label="Edit todo item" 
                        onClick={() => setIsEditing(true)}
                    >
                        <TbEdit />
                    </button>
                }

                {/* Task input and save action. */}
                <form onSubmit={handleSubmit}>
                    {isEditing &&
                        <button type="submit" title="Save" aria-label="Save changes">
                            <TbDeviceFloppy />
                        </button> 
                    }
                    <input 
                        ref={taskInputRef}
                        className={`todo-tasks ${todo.completed ? "completed" : ""}`}
                        value={task} 
                        disabled={!isEditing} 
                        onChange={(event) => setTask(event.target.value)}
                    />
                </form>
            </div>
            {error && <p role="alert" className="error-message">{error}</p>}
        </div>
    );
}