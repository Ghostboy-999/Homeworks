import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { AuthProvider } from './contexts/AuthContext'
import { TasksProvider } from './contexts/TasksContext'
import { useAuth } from './contexts/useAuth'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import TasksPage from './pages/TasksPage'

function RequireAuth() {
  const { user, loading } = useAuth()
  if (loading) return <div className="page">Cargando...</div>
  return user ? <Outlet /> : <Navigate to="/login" replace />
}

function RedirectIfAuthed() {
  const { user, loading } = useAuth()
  if (loading) return <div className="page">Cargando...</div>
  return user ? <Navigate to="/" replace /> : <Outlet />
}

function AppShell() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <TasksProvider>
          <Routes>
            <Route element={<RedirectIfAuthed />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            <Route element={<RequireAuth />}>
              <Route element={<AppShell />}>
                <Route path="/" element={<TasksPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Route>
          </Routes>
        </TasksProvider>
      </BrowserRouter>
    </AuthProvider>
  )
}

