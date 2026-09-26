import { getOverallProgress } from "../utils/progress";
import type { Todo } from "../utils/types";

export function ProgressTracker({ todos }:{ todos: Todo[] }) {
    const progress = getOverallProgress({todos});
    return (
        <div id="progress-tracker-container">
            <div className="progress-bar">
              <progress value={progress} max={100} />
              <span>{Math.round(progress)}%</span>
            </div>
        </div>
    )
}