import { useContext } from 'react'
import { Link } from 'react-router-dom'

import CartWidget from '../CartWidget/CartWidget'
import { AuthContext } from '../../context/AuthContext'

function NavBar() {
  const {
    usuario,
    autenticado,
    esAdmin,
    cargando
  } = useContext(AuthContext)

  return (
    <nav className="navbar" aria-label="Navegación principal">
      <ul className="nav-list">
        <li>
          <Link to="/">Inicio</Link>
        </li>

        <li>
          <Link to="/productos">Productos</Link>
        </li>

        {!cargando && esAdmin && (
          <li>
            <Link to="/gestion">Administración</Link>
          </li>
        )}

        {!cargando && autenticado && (
          <li>
            <Link to="/perfil">Mi perfil</Link>
          </li>
        )}

        {!cargando && !autenticado && (
          <>
            <li>
              <Link to="/login">
                {usuario ? 'Mi sesión' : 'Iniciar sesión'}
              </Link>
            </li>

            {!usuario && (
              <li>
                <Link to="/registro">Registrarme</Link>
              </li>
            )}
          </>
        )}

        <li>
          <CartWidget />
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
