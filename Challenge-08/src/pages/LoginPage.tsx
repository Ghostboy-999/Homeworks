import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/useAuth'

export default function LoginPage() {
  const { signIn, error, clearError } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    clearError()
    try {
      await signIn(email, password)
      navigate('/', { replace: true })
    } catch {
      // Auth hook exposes the error message via context.
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="app-auth">
      <div className="card app-card app-auth__card">
        <div className="card-body">
          <h2 className="mb-3">Login</h2>
          <form onSubmit={handleSubmit} className="app-form">
            <label className="form-label">Email</label>
            <input
              className="form-control app-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="you@example.com"
            />

            <label className="form-label mt-3">Password</label>
            <input
              className="form-control app-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
            />

            {error ? <div className="alert alert-danger mt-3">{error}</div> : null}

            <button
              className="btn btn-primary w-100 mt-4"
              type="submit"
              disabled={submitting}
            >
              {submitting ? 'Signing in...' : 'Login'}
            </button>

            <div className="mt-3 text-center">
              <span className="text-muted">No tienes cuenta?</span>{' '}
              <Link to="/register">Register</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

