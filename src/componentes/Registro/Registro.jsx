import { toast } from 'react-toastify'
import { useContext, useState } from 'react'
import {
  Link,
  Navigate,
  useLocation
} from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'
import { obtenerMensajeError } from '../../services/authService'

function Registro() {
  const {
    registro,
    usuario,
    autenticado,
    cargando,
    errorSesion
  } = useContext(AuthContext)

  const location = useLocation()

  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmarPassword: ''
  })

  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [procesando, setProcesando] = useState(false)
  const [error, setError] = useState('')

  if (autenticado && !cargando) {
    return (
      <Navigate
        to={location.state?.from || '/perfil'}
        replace
      />
    )
  }

  const manejarCambio = (event) => {
    const { name, value } = event.target

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value
    }))
  }

  const manejarRegistro = async (event) => {
    event.preventDefault()
    setError('')

    const {
      nombre,
      email,
      password,
      confirmarPassword
    } = formulario

    if (nombre.trim().length < 2) {
      setError('Ingresa un nombre válido.')
      return
    }

    if (!email.trim()) {
      setError('Ingresa tu correo electrónico.')
      return
    }

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.')
      return
    }

    if (password !== confirmarPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setProcesando(true)

    try {
      await registro(
        nombre.trim(),
        email.trim(),
        password
      )
      toast.success('Cuenta creada correctamente.')
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

        <h2>Crear cuenta</h2>

        <p className="auth-descripcion">
          Regístrate y comienza a disfrutar de Tech Store.
        </p>

        {(error || errorSesion) && (
          <div className="auth-error" role="alert">
            {error || errorSesion}
          </div>
        )}

        <form
          className="auth-form"
          onSubmit={manejarRegistro}
        >
          <div className="auth-campo">
            <label htmlFor="registro-nombre">
              Nombre completo
            </label>

            <input
              id="registro-nombre"
              name="nombre"
              type="text"
              value={formulario.nombre}
              onChange={manejarCambio}
              autoComplete="name"
              placeholder="Tu nombre"
              maxLength={100}
              required
            />
          </div>

          <div className="auth-campo">
            <label htmlFor="registro-email">
              Correo electrónico
            </label>

            <input
              id="registro-email"
              name="email"
              type="email"
              value={formulario.email}
              onChange={manejarCambio}
              autoComplete="email"
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <div className="auth-campo">
            <label htmlFor="registro-password">
              Contraseña
            </label>

            <div className="auth-password">
              <input
                id="registro-password"
                name="password"
                type={mostrarPassword ? 'text' : 'password'}
                value={formulario.password}
                onChange={manejarCambio}
                autoComplete="new-password"
                placeholder="Mínimo 8 caracteres"
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

          <div className="auth-campo">
            <label htmlFor="registro-confirmar">
              Confirmar contraseña
            </label>

            <input
              id="registro-confirmar"
              name="confirmarPassword"
              type={mostrarPassword ? 'text' : 'password'}
              value={formulario.confirmarPassword}
              onChange={manejarCambio}
              autoComplete="new-password"
              placeholder="Repite tu contraseña"
              required
            />
          </div>

          <button
            type="submit"
            className="auth-boton"
            disabled={procesando || cargando || Boolean(usuario)}
          >
            {procesando || cargando
              ? 'Creando cuenta...'
              : 'Registrarme'}
          </button>
        </form>

        <p className="auth-enlace">
          ¿Ya tienes una cuenta?{' '}
          <Link
            to="/login"
            state={location.state}
          >
            Inicia sesión
          </Link>
        </p>

        <Link className="auth-volver" to="/">
          ← Volver al inicio
        </Link>
      </div>
    </section>
  )
}

export default Registro
