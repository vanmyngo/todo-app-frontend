import { useState } from "react";
import { signUp } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import { AuthCard } from "../components/AuthCard";
import { AuthInput } from "../components/AuthInput";
import { AuthFooter } from "../components/AuthFooter";

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
        <AuthCard
            title="Signup"
            subtitle="Ready to join?"
        >
            <form onSubmit={handleSignup} className="auth-form">
                <AuthInput
                    id="email"
                    label="Email"
                    inputType="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                />
                <AuthInput
                    id="password"
                    label="Password"
                    inputType="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="password"
                />
                
                {error && <p className="error-message">{error}</p>}

                <button type="submit">
                    {loading ? "Signing up..." : "Sign up"}
                </button>
            </form>
            <AuthFooter
                prompt="Already have an account?"
                linkText="Log in"
                to="/login"
            />
        </AuthCard>
    );
}