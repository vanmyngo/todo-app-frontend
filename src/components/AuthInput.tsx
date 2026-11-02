import type { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

export const AuthInput = ({
    id,
    label,
    inputType,
    value,
    onChange,
    autoComplete
}: {
    id: string,
    label: string,
    inputType: HTMLInputTypeAttribute,
    value: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
    autoComplete?: string,
}) => {
    return (
        <div className="auth-input">
            <label className="muted-text" htmlFor={id}>
                {label}
            </label>
            <input
                id={id}
                type={inputType}
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
                className="auth-input__field"
            />
        </div>
    )
};