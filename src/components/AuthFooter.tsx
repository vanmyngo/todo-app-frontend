import { Link, type To } from "react-router-dom";

export const AuthFooter = ({
    prompt,
    linkText,
    to
}: {
    prompt: string,
    linkText: string,
    to: To
}) => {
    return (
        <footer className="auth-footer">
            {prompt}
            <Link to={to}>{linkText}</Link>
        </footer>
    )
};