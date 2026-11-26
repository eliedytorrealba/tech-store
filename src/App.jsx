import './App.css'
import { lazy, Suspense } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Layout from './componentes/Layout/Layout'

const ItemListContainer = lazy(() =>
  import('./componentes/ItemListContainer/ItemListContainer')
)

const ItemDetailContainer = lazy(() =>
  import('./componentes/ItemDetailContainer/ItemDetailContainer')
)

const Cart = lazy(() =>
  import('./componentes/Cart/Cart')
)

function CargandoPagina() {
  return (
    <section
      role="status"
      aria-live="polite"
      style={{
        textAlign: 'center',
        padding: '60px 20px'
      }}
    >
      <p>Cargando página...</p>
    </section>
  )
}

function App() {
  return (
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
          element={
            <Suspense fallback={<CargandoPagina />}>
              <ItemListContainer />
            </Suspense>
          }
        />

        <Route
          path="/producto/:id"
          element={
            <Suspense fallback={<CargandoPagina />}>
              <ItemDetailContainer />
            </Suspense>
          }
        />

        <Route
          path="/carrito"
          element={
            <Suspense fallback={<CargandoPagina />}>
              <Cart />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}

export default App