import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import { LogoProvider } from "./context/LogoContext";
import AppRouter from "./routes/AppRouter";
import DarkModeProvider from "./context/DarkModeContext";
import useDarkMode from "./hooks/useDarkMode";
import './App.css';

function AppContent() {
  const { openDarkMode } = useDarkMode();
  return (
    <div className={openDarkMode ? "dark" : "light"} style={{ minHeight: "100vh" }}>
      <LogoProvider>
        <ToastContainer />
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </LogoProvider>
    </div>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  );
}

export default App;
