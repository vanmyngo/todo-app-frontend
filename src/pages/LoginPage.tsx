import { useState } from "react";
import { signIn } from "@aws-amplify/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    async function handleLogin(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError("");
        const user = await signIn({ username: email, password });
        if (!user) {
            setError("Invalid email or password");
        } else {
            const navigate = useNavigate();
            navigate("/todos");
        }
        setLoading(false);
    }

    return (
        <div className="auth-card">
            <div className="auth-title">
                <h1>Login</h1>
                <p className="subtle-text">Let's get your day started</p>
            </div>
            <form onSubmit={handleLogin} className="auth-form">
                <div className="auth-input">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="auth-input">
                    <label htmlFor="password">Password</label>
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
                Already have an account? <Link to="/signup">Sign up</Link>
            </div>
        </div>
    );
}