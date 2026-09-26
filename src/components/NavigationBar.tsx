import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/name.ico";
import { signOut } from "aws-amplify/auth";
import { useAuth } from "../auth/AuthContext";

export function NavigationBar() {
    // Read the latest auth state shared by the provider.
    const { isSignedIn, checking } = useAuth();
    const navigate = useNavigate();

    // Sign out and return to the login page.
    async function handleLogout() {
        await signOut();
        navigate("/login");
    }

    // Hide the navbar until the initial auth check finishes.
    if (checking) return null;

    // Show account actions based on the current auth state.
    return (
        <nav className="navigation-bar">
            <Link to="/todos">
                <img src={logo} className="brand-logo"/>
            </Link>
            <div className="navigation-menu">
                {isSignedIn ? (
                    <button type="button" onClick={handleLogout}>LOGOUT</button>
                ) : (
                    <>
                        <Link to="/login">LOGIN</Link>
                        <Link to="/signup">SIGNUP</Link>
                    </>
                )}
            </div>
        </nav>
    );
}