import type { DropdownProps } from '../utils/types'

/** Renders a dropdown filter with a label. */
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