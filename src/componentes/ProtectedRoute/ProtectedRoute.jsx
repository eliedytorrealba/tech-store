import { useContext } from 'react'

import {
  Navigate,
  Outlet,
  useLocation,
  Link
} from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'

function ProtectedRoute({ roles = [], children }) {
  const {
    usuario,
    perfil,
    cargando,
    errorSesion
  } = useContext(AuthContext)

  const location = useLocation()

  if (cargando) {
    return (
      <section className="auth-estado" role="status">
        <div className="auth-spinner" />
        <p>Verificando sesión...</p>
      </section>
    )
  }

  if (!usuario) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    )
  }

  if (errorSesion || !perfil) {
    return (
      <section className="auth-estado">
        <h2>No se pudo verificar tu perfil</h2>

        <p role="alert">
          {errorSesion || 'Tu perfil no está disponible.'}
        </p>

        <Link to="/">Volver al inicio</Link>
      </section>
    )
  }

  if (roles.length > 0 && !roles.includes(perfil.rol)) {
    return (
      <section className="auth-estado">
        <h2>Acceso denegado</h2>

        <p>
          No tienes permisos para acceder a esta sección.
        </p>

        <Link to="/">Volver al inicio</Link>
      </section>
    )
  }

  return children || <Outlet />
}

export default ProtectedRoute
