import {
  useEffect,
  useRef,
  useState
} from 'react'

import { AuthContext } from './AuthContext'

import {
  asegurarPerfil,
  registrarUsuario,
  iniciarSesion,
  cerrarSesion,
  observarSesion,
  obtenerMensajeError
} from '../services/authService'

function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [perfil, setPerfil] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [errorSesion, setErrorSesion] = useState('')

  const registroPendiente = useRef(null)

  useEffect(() => {
    let activo = true
    let version = 0

    const cancelarSuscripcion = observarSesion(
      async (usuarioFirebase) => {
        const versionActual = ++version

        setCargando(true)
        setErrorSesion('')
        setUsuario(usuarioFirebase)
        setPerfil(null)

        try {
          if (usuarioFirebase) {
            const perfilUsuario = await asegurarPerfil(
              usuarioFirebase,
              registroPendiente.current
            )

            if (activo && versionActual === version) {
              setPerfil(perfilUsuario)
            }
          }
        } catch (error) {
          console.error('Error al obtener el perfil:', error)

          if (activo && versionActual === version) {
            setErrorSesion(obtenerMensajeError(error))
          }
        } finally {
          if (activo && versionActual === version) {
            setCargando(false)
          }
        }
      }
    )

    return () => {
      activo = false
      cancelarSuscripcion()
    }
  }, [])

  const registro = async (nombre, email, password) => {
    registroPendiente.current = nombre.trim()

    try {
      return await registrarUsuario(
        nombre,
        email,
        password
      )
    } finally {
      registroPendiente.current = null
    }
  }

  const login = async (email, password) => {
    return iniciarSesion(email, password)
  }

  const logout = async () => {
    await cerrarSesion()
  }

  const autenticado = Boolean(usuario && perfil)

  const esAdmin =
    autenticado && perfil.rol === 'admin'

  const esCliente =
    autenticado && perfil.rol === 'cliente'

  return (
    <AuthContext.Provider
      value={{
        usuario,
        perfil,
        cargando,
        errorSesion,
        autenticado,
        esAdmin,
        esCliente,
        registro,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
