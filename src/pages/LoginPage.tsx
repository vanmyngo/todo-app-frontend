import { useEffect, useState } from "react";
import { signIn } from "@aws-amplify/auth";
import { Link, useNavigate } from "react-router-dom";
import { errorMessages, nextStepMessages } from "../auth/authMessages";
import { useAuth } from "../auth/AuthContext";
import { AuthCard } from "../components/AuthCard";
import { AuthInput } from "../components/AuthInput";
import { AuthFooter } from "../components/AuthFooter";

export default function Login() {
    // Store form values, status, and any login error.
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { isSignedIn, checking } = useAuth();
    const [needConfirmation, setNeedConfirmation] = useState(false);
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
        setNeedConfirmation(false);

        try {
            const result = await signIn({ username: email, password, options: { authFlowType: "USER_SRP_AUTH" } });
            if (result.isSignedIn) {
                navigate("/todos");
                return;
            }

            if (result.nextStep.signInStep === "CONFIRM_SIGN_UP") { 
                setNeedConfirmation(true); 
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
        <AuthCard
            title="Login"
            subtitle="Let's get your day started"
        >
            <form onSubmit={handleLogin} className="auth-form">
                <AuthInput
                    id="email"
                    label="Email"
                    inputType="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <AuthInput
                    id="password"
                    label="Password"
                    inputType="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                
                {error && (
                    <p className="error-message">
                        {error}
                        {needConfirmation && (
                            <>
                                <br />
                                <Link to="/confirm-signup">Confirm your account</Link>
                            </>
                        )}
                    </p>
                )}

                <button type="submit" className="auth-card__submit-button" disabled={loading}>
                    {loading ? "Logging in..." : "Log in"}
                </button>
            </form>
            <AuthFooter
                prompt="No account?"
                linkText="Sign up"
                to="/signup"
            />
        </AuthCard>
    );
}