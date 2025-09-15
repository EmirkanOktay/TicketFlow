import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import { LogoProvider } from "./context/LogoContext";
import AppRouter from "./routes/AppRouter";
import DarkModeProvider from "./context/DarkModeContext";
import 'react-toastify/dist/ReactToastify.css'
import useDarkMode from "./hooks/useDarkMode";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import './App.css';

function AppContent() {
  const { openDarkMode } = useDarkMode();

  const theme = createTheme({
    palette: {
      mode: openDarkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ minHeight: "100vh" }}>
        <LogoProvider>
          <ToastContainer />
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </LogoProvider>
      </div>
    </ThemeProvider>
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
