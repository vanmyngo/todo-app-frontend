import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmSignUp, resendSignUpCode } from "@aws-amplify/auth";
import { confirmSignUpErrorMessages, resendSignUpCodeErrorMessages } from "../auth/authMessages";
import { AuthCard } from "../components/AuthCard";
import { AuthInput } from "../components/AuthInput";

export default function ConfirmSignup() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [resend, setResend] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    async function handleConfirmSignup(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        try {
            await confirmSignUp({ username: email, confirmationCode });
            navigate("/login");
        } catch (err) {
            const errorName = err instanceof Error ? err.name : "";
            setError(confirmSignUpErrorMessages[errorName] ?? "Unable to verify.");
        } finally {
            setLoading(false);
        }
    }

    async function handleResendConfirmation() {
        try {
            await resendSignUpCode({ username: email });
            setResend(true);
            window.setTimeout(() => setResend(false), 10_000);
        } catch (err) {
            const errorName = err instanceof Error ? err.name : "";
            setError(resendSignUpCodeErrorMessages[errorName] ?? "Unable to resend confirmation code.");
        }
    }

    return (
        <AuthCard
            title="Confirm"
            subtitle="Let's get you verify"
        >
            <form onSubmit={handleConfirmSignup} className="auth-form">
                <AuthInput
                    id="confirmationEmail"
                    label="Email"
                    inputType="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                />
                <AuthInput 
                    id="confirmationCode"
                    label="Confirmation Code"
                    inputType="text"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                />

                {error && <p className="error-message">{error}</p>}

                <button type="submit" className="auth-card__submit-button" disabled={loading}>
                    {loading ? "Confirming..." : "Confirm"}
                </button>
                <button type="button" className="auth-card__link-button" onClick={handleResendConfirmation} disabled={loading || resend}>
                    { resend ? "Code sent!" : "Resend Code" }
                </button>
            </form>
        </AuthCard>
    );
};