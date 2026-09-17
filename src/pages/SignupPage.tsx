import { useState } from "react";
import { signUp } from "aws-amplify/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleSignup(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError("");
        try {
            await signUp({ username: email, password });
            navigate("/confirm-signup");
        } catch (err) {
            console.error("[src/pages/SignupPage.tsx] Failed: " + err);
            setError("Failed to sign up.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-card">
            <div className="auth-title">
                <h1>Signup</h1>
                <p className="subtle-text">Ready to join?</p>
            </div>
            <form onSubmit={handleSignup} className="auth-form">
                <div className="auth-input">
                    <label className="muted-text" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        aria-label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                    />
                </div>
                <div className="auth-input">
                    <label className="muted-text" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        aria-label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="password"
                    />
                </div>
                
                {error && <p className="error-message">{error}</p>}

                <button type="submit">
                    {loading ? "Signing up..." : "Sign up"}
                </button>
            </form>
            <div className="auth-footer">
                No account? 
                <Link to="/login">Log in</Link>
            </div>
        </div>
    );
}