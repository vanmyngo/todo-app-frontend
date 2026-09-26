export interface Todo {
    userId: string;
    taskId: string;
    task: string;
    completed: boolean;
    createdAt: Date;
}