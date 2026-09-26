import { getOverallProgress } from "../utils/progress";
import type { Todo } from "../utils/types";

export function ProgressTracker({ todos }:{ todos: Todo[] }) {
    const progress = getOverallProgress({todos});
    return (
        <div id="progress-tracker-container">
            <span className="progress-label">Progress</span>
            <div className="progress-bar">
                <progress value={progress} max={100} aria-label="Tasks completed" />
                <span className="progress-percentage">{Math.round(progress)}%</span>
            </div>
        </div>
    )
}