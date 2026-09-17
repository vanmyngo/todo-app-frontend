import { useState } from "react";
import { signIn } from "@aws-amplify/auth";
import { useNavigate, Link } from "react-router-dom";
import { errorMessages, nextStepMessages } from "../utils/authMessages";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleLogin(event: React.SubmitEvent<HTMLFormElement>) {
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