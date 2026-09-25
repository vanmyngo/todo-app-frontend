import { useEffect, useState } from "react";
import { signIn } from "@aws-amplify/auth";
import { useNavigate, Link } from "react-router-dom";
import { errorMessages, nextStepMessages } from "../utils/authMessages";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
    // Store form values, status, and any login error.
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { isSignedIn, checking } = useAuth();
    const navigate = useNavigate();

    // Send already signed-in users to the todo page.
    useEffect(() => {
        if (!checking && isSignedIn) navigate("/todos");
    }, [checking, isSignedIn, navigate]);

    /**
     * Attempts to sign in the user and routes completed sign-ins to the todo page.
     * Incomplete authentication steps and known sign-in errors are shown in the form.
     *
     * @param event Form submission event.
     * @returns A promise that resolves when sign-in handling is complete.
     */
    async function handleLogin(event: React.SubmitEvent<HTMLFormElement>) {
        // Submit credentials and handle completed or additional sign-in steps.
        event.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await signIn({ username: email, password, options: { authFlowType: "USER_SRP_AUTH" } });
            if (result.isSignedIn) {
                navigate("/todos");
                return;
            }
            setError(nextStepMessages[result.nextStep.signInStep] ?? "Additional confirmation is required.");
        } catch (err: unknown) {
            const errorName = err instanceof Error ? err.name : "";
            setError(errorMessages[errorName] ?? "Unable to log in. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    // Show a loading screen while the session is being checked.
    if (checking) {
        return (
            <div className="auth-card">
                <p>Loading...</p>
            </div>
        );
    }

    // Render the login form after the session check completes.
    return (
        <div className="auth-card">
            <div className="auth-title">
                <h1>Login</h1>
                <p className="subtle-text">Let's get your day started</p>
            </div>
            <form onSubmit={handleLogin} className="auth-form">
                <div className="auth-input">
                    <label className="muted-text" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="auth-input">
                    <label className="muted-text" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                
                {error && <p className="error-message">{error}</p>}

                <button type="submit">
                    {loading ? "Logging in..." : "Log in"}
                </button>
            </form>
            <div className="auth-footer">
                Already have an account?
                <Link to="/signup">Sign up</Link>
            </div>
        </div>
    );
}