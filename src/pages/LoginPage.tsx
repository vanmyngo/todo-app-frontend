import { useState } from "react";
import { signIn } from "@aws-amplify/auth";
import { useNavigate } from "react-router-dom";

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
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <p className="error-message">{error}</p>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">
                    {loading ? "Signing in..." : "Sign In"}
                </button>
            </form>
        </div>
    );
}