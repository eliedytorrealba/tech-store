import { toast } from 'react-toastify'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'
import { obtenerMensajeError } from '../../services/authService'

function Perfil() {
  const {
    perfil,
    esAdmin,
    logout
  } = useContext(AuthContext)

  const navigate = useNavigate()

  const [procesando, setProcesando] = useState(false)
  const [error, setError] = useState('')

  const manejarLogout = async () => {
    setProcesando(true)
    setError('')

    try {
      await logout()
      toast.info('Sesión cerrada correctamente.')
      navigate('/', { replace: true })
    } catch (error) {
      setError(obtenerMensajeError(error))
    } finally {
      setProcesando(false)
    }
  }

  return (
    <section className="auth-section">
      <div className="auth-card perfil-card">
        <div className="perfil-avatar">
          {perfil.nombre.charAt(0).toUpperCase()}
        </div>

        <span className="auth-label">MI CUENTA</span>

        <h2>Hola, {perfil.nombre}</h2>

        <p className="auth-descripcion">
          Bienvenido a tu perfil de Tech Store.
        </p>

        {error && (
          <div className="auth-error" role="alert">
            {error}
          </div>
        )}

        <div className="perfil-datos">
          <div className="perfil-dato">
            <span>Nombre</span>
            <strong>{perfil.nombre}</strong>
          </div>

          <div className="perfil-dato">
            <span>Correo electrónico</span>
            <strong>{perfil.email}</strong>
          </div>

          <div className="perfil-dato">
            <span>Tipo de cuenta</span>

            <strong
              className={`perfil-rol ${
                esAdmin ? 'rol-admin' : 'rol-cliente'
              }`}
            >
              {esAdmin ? 'Administrador' : 'Cliente'}
            </strong>
          </div>
        </div>

        <Link
          className="auth-boton"
          to={esAdmin ? '/gestion' : '/productos'}
        >
          {esAdmin
            ? 'Gestionar productos'
            : 'Ver productos'}
        </Link>

        <button
          type="button"
          className="auth-boton-secundario"
          onClick={manejarLogout}
          disabled={procesando}
        >
          {procesando
            ? 'Cerrando sesión...'
            : 'Cerrar sesión'}
        </button>
      </div>
    </section>
  )
}

export default Perfil
