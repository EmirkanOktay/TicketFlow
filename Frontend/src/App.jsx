import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./routes/AppRouter";


function App() {
  return (
    <>
      <ToastContainer />
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </>
  );
}

export default App;
