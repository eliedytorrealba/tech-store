import './App.css'

import { lazy, Suspense } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import Layout from './componentes/Layout/Layout'
import ProtectedRoute from './componentes/ProtectedRoute/ProtectedRoute'

const ItemListContainer = lazy(() =>
  import('./componentes/ItemListContainer/ItemListContainer')
)

const ItemDetailContainer = lazy(() =>
  import('./componentes/ItemDetailContainer/ItemDetailContainer')
)

const Cart = lazy(() =>
  import('./componentes/Cart/Cart')
)

const Login = lazy(() =>
  import('./componentes/Login/Login')
)

const Registro = lazy(() =>
  import('./componentes/Registro/Registro')
)

const Perfil = lazy(() =>
  import('./componentes/Perfil/Perfil')
)

const GestionProductos = lazy(() =>
  import('./componentes/GestionProductos/GestionProductos')
)

function App() {
  return (
    <Suspense
      fallback={
        <section className="auth-estado" role="status">
          <div className="auth-spinner" />
          <p>Cargando página...</p>
        </section>
      }
    >
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <section className="inicio">
                <div className="inicio-contenido">
                  <span className="inicio-label">
                    TECH STORE
                  </span>

                  <h2>
                    Tecnología para tu día a día
                  </h2>

                  <p>
                    Encontrá notebooks, smartphones,
                    consolas, accesorios y mucho más
                    en un solo lugar.
                  </p>

                  <Link
                    className="inicio-boton"
                    to="/productos"
                  >
                    Ver productos
                  </Link>
                </div>

                <div className="inicio-visual">
                  <div className="inicio-icono">
                    💻
                  </div>

                  <h3>Todo en tecnología</h3>

                  <p>
                    Productos seleccionados para trabajar,
                    estudiar y disfrutar.
                  </p>
                </div>
              </section>
            }
          />

          <Route
            path="/productos"
            element={<ItemListContainer />}
          />

          <Route
            path="/producto/:id"
            element={<ItemDetailContainer />}
          />

          <Route
            path="/carrito"
            element={<Cart />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/registro"
            element={<Registro />}
          />

          <Route
            element={
              <ProtectedRoute roles={['cliente', 'admin']} />
            }
          >
            <Route
              path="/perfil"
              element={<Perfil />}
            />
          </Route>

          <Route
            element={
              <ProtectedRoute roles={['admin']} />
            }
          >
            <Route
              path="/gestion"
              element={<GestionProductos />}
            />
          </Route>

          <Route
            path="*"
            element={
              <section className="auth-estado">
                <h2>Página no encontrada</h2>

                <p>
                  La página que buscas no existe.
                </p>

                <Link to="/">Volver al inicio</Link>
              </section>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App