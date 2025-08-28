import { AuthProvider } from "./context/AuthContext"
import AppRouter from "./routes/AppRouter"

function App() {

  return (
    <div>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  )
}

export default App
