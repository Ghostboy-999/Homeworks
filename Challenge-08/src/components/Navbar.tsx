import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/useAuth'

export function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      await signOut()
    } finally {
      navigate('/login', { replace: true })
    }
  }

  return (
    <nav className="navbar app-navbar">
      <div className="container-fluid app-navbar__inner">
        <Link to="/" className="navbar-brand app-navbar__brand">
          Homeworks Tasks
        </Link>
        <div className="d-flex align-items-center gap-2">
          {user?.email ? (
            <span className="app-navbar__email d-none d-md-inline">
              {user.email}
            </span>
          ) : null}
          <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

