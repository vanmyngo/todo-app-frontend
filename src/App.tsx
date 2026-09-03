import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import TodosPage from "./pages/TodosPage";
import ConfirmSignupPage from "./pages/ConfirmSignupPage";
import WelcomePage from "./pages/WelcomePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/todos" element={<TodosPage />} />
        <Route path="/confirm-signup" element={<ConfirmSignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}