import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Layout from './componentes/Layout/Layout'
import ItemListContainer from './componentes/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './componentes/ItemDetailContainer/ItemDetailContainer'
import Cart from './componentes/Cart/Cart'

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
      </Route>
    </Routes>
  )
}

export default App