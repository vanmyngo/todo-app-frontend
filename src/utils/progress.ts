import type { Todo } from './types';

/**
 * Get completed tasks progress.
 * @param todos List of todos 
 * @returns Percentage of complete tasks
 */
export function getOverallProgress({ todos }: { todos: Todo[] }) {
    if (todos.length === 0) return 0;

    const completedTasks = todos.filter((task) => task.completed).length;
    return (completedTasks / todos.length) * 100;
}