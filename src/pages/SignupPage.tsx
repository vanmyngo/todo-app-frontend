import { useState } from "react";
import { signUp } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSignup(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError("");
        const output = await signUp({ username: email, password });
        if (!output.isSignUpComplete) {
            setError("Signup failed. Please try again.");
        } else {
            const navigate = useNavigate();
            navigate("/confirm-signup");
        }
        setLoading(false);
    };

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <p className="error-message">{error}</p>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        aria-label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        aria-label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">
                    {loading ? "Signing up..." : "Sign Up"}
                </button>
            </form>
        </div>
    );
}