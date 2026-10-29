import type { DropdownProps } from '../utils/types'

/**
 * A dropdown component for filtering todos.
 * @param {string} label - The label for the dropdown.
 * @param {string} value - The current selected value of the dropdown.
 * @param {Array<{ value: string, label: string }>} options - The options for the dropdown.
 * @param {(value: string) => void} onChange - The callback function to handle changes in the dropdown selection.
 */
export function Dropdown({ label, value, options, onChange }: DropdownProps) {
    return (
        <label className="todo-filter-dropdown-label">
            {label}
            <select 
                className="todo-filter-dropdown"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    )
}