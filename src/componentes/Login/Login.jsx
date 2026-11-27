import { toast } from 'react-toastify'
import { useContext, useState } from 'react'
import {
  Link,
  Navigate,
  useLocation
} from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'
import { obtenerMensajeError } from '../../services/authService'

function Login() {
  const {
    login,
    logout,
    usuario,
    autenticado,
    esAdmin,
    cargando,
    errorSesion
  } = useContext(AuthContext)

  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [procesando, setProcesando] = useState(false)
  const [error, setError] = useState('')

  if (autenticado && !cargando) {
    return (
      <Navigate
        to={location.state?.from || (
          esAdmin ? '/gestion' : '/perfil'
        )}
        replace
      />
    )
  }

  const manejarLogin = async (event) => {
    event.preventDefault()
    setError('')

    if (!email.trim() || !password) {
      setError('Completa todos los campos.')
      return
    }

    setProcesando(true)

    try {
      await login(email, password)
      toast.success('Credenciales verificadas correctamente.')
    } catch (error) {
      setError(obtenerMensajeError(error))
    } finally {
      setProcesando(false)
    }
  }

  return (
    <section className="auth-section">
      <div className="auth-card">
        <span className="auth-label">TECH STORE</span>

        <h2>Iniciar sesión</h2>

        <p className="auth-descripcion">
          Ingresa a tu cuenta para continuar.
        </p>

        {(error || errorSesion) && (
          <div className="auth-error" role="alert">
            {error || errorSesion}
          </div>
        )}

        {usuario && errorSesion ? (
          <button
            type="button"
            className="auth-boton"
            onClick={async () => {
              try {
                await logout()
              } catch (error) {
                setError(obtenerMensajeError(error))
              }
            }}
          >
            Cerrar sesión e intentar nuevamente
          </button>
        ) : (
          <form
            className="auth-form"
            onSubmit={manejarLogin}
          >
            <div className="auth-campo">
              <label htmlFor="login-email">
                Correo electrónico
              </label>

              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="correo@ejemplo.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="auth-campo">
              <label htmlFor="login-password">
                Contraseña
              </label>

              <div className="auth-password">
                <input
                  id="login-password"
                  type={mostrarPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  autoComplete="current-password"
                  placeholder="Ingresa tu contraseña"
                  required
                />

                <button
                  type="button"
                  className="auth-ver-password"
                  aria-pressed={mostrarPassword}
                  onClick={() =>
                    setMostrarPassword(!mostrarPassword)
                  }
                >
                  {mostrarPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="auth-boton"
              disabled={procesando || cargando}
            >
              {procesando || cargando
                ? 'Verificando...'
                : 'Iniciar sesión'}
            </button>
          </form>
        )}

        <p className="auth-enlace">
          ¿Todavía no tienes una cuenta?{' '}
          <Link
            to="/registro"
            state={location.state}
          >
            Regístrate
          </Link>
        </p>

        <Link className="auth-volver" to="/">
          ← Volver al inicio
        </Link>
      </div>
    </section>
  )
}

export default Login
