import type { Todo } from '../components/types';

/**
 * Get completed tasks progress.
 * @param todos List of todos 
 * @returns Percentage of complete tasks
 */
export function getOverallProgress({ todos }: { todos: Todo[] }) {
    const completedTasks = todos.filter((task) => task.completed).length;
    return (completedTasks / todos.length) * 100;
}