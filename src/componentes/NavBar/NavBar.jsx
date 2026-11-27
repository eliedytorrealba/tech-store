import { useContext } from 'react'
import { Link } from 'react-router-dom'

import {
  FiHome,
  FiGrid,
  FiSettings,
  FiUser,
  FiLogIn,
  FiUserPlus,
} from 'react-icons/fi'

import CartWidget from '../CartWidget/CartWidget'
import { AuthContext } from '../../context/AuthContext'

function NavBar() {
  const {
    usuario,
    autenticado,
    esAdmin,
    cargando,
  } = useContext(AuthContext)

  return (
    <nav
      className="navbar"
      aria-label="Navegación principal"
    >
      <ul className="nav-list">
        <li>
          <Link to="/">
            <FiHome aria-hidden="true" />
            {' '}Inicio
          </Link>
        </li>

        <li>
          <Link to="/productos">
            <FiGrid aria-hidden="true" />
            {' '}Productos
          </Link>
        </li>

        {!cargando && esAdmin && (
          <li>
            <Link to="/gestion">
              <FiSettings aria-hidden="true" />
              {' '}Administración
            </Link>
          </li>
        )}

        {!cargando && autenticado && (
          <li>
            <Link to="/perfil">
              <FiUser aria-hidden="true" />
              {' '}Mi perfil
            </Link>
          </li>
        )}

        {!cargando && !autenticado && (
          <>
            <li>
              <Link to="/login">
                <FiLogIn aria-hidden="true" />

                {' '}
                {usuario ? 'Mi sesión' : 'Iniciar sesión'}
              </Link>
            </li>

            {!usuario && (
              <li>
                <Link to="/registro">
                  <FiUserPlus aria-hidden="true" />
                  {' '}Registrarme
                </Link>
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