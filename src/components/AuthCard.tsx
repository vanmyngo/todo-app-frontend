import type { ReactNode } from "react";

export const AuthCard = ({ 
    title, 
    subtitle, 
    children 
}: {
    title: string, 
    subtitle: string, 
    children: ReactNode 
}) => {
    return (
        <main className="auth-card">
            <header className="auth-title">
                <h1>{title}</h1>
                <p className="subtle-text">{subtitle}</p>
            </header>
            {children}
        </main>
    )
};