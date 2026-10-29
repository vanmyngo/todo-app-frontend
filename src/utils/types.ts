export interface Todo {
    userId: string;
    taskId: string;
    task: string;
    completed: boolean;
    completedDate: Date | null;
    createdAt: Date;
}

//#region Filter Options
export type DropdownOption = {
    value: string;
    label: string;
};

export type DropdownProps = {
    label: string;
    value: string;
    options: readonly DropdownOption[];
    onChange: (value: string) => void;
};

export const STATUS_OPTIONS = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" }
] as const;

export type StatusFilter = (typeof STATUS_OPTIONS)[number]["value"];

export const DAYS_OPTIONS = [
    { value: "all", label: "Anytime" },
    { value: "7", label: "Last 7 days" },
    { value: "30", label: "Last 30 days" },
    { value: "90", label: "Last 90 days" }
] as const;

export type DaysFilter = (typeof DAYS_OPTIONS)[number]["value"];
//#endregion