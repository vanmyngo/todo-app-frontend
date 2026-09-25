import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import type { AuthUser } from "aws-amplify/auth";

type AuthContextValue = {
    user: AuthUser | null;
    isSignedIn: boolean;
    checking: boolean;
};

// Stores shared authentication state for the whole app.
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    // Keep the current user and show a loading state during the first check.
    const [user, setUser] = useState<AuthUser | null>(null);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        // Restore the user's session when the app starts.
        getCurrentUser()
            .then(setUser)
            .catch(() => setUser(null))
            .finally(() => setChecking(false));

        // Keep the shared state updated after login or logout.
        return Hub.listen("auth", ({ payload }) => {
            if (payload.event === "signedIn") {
                getCurrentUser().then(setUser).catch(() => setUser(null));
            }
            if (payload.event === "signedOut") {
                setUser(null);
            }
        });
    }, []);

    // Make auth state available to all child components.
    return (
        <AuthContext.Provider value={{ user, isSignedIn: user !== null, checking }}>
            {children}
        </AuthContext.Provider>
    );
}

// Reads shared auth state from a component.
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
}