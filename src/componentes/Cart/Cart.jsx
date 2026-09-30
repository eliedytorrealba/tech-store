import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'

function Cart() {
  const {
    carrito,
    eliminarDelCarrito,
    vaciarCarrito,
    precioTotal
  } = useContext(CartContext)

  if (carrito.length === 0) {
    return (
      <section className="carrito-section">
        <div className="carrito-vacio">
          <div className="carrito-vacio-icono">
            🛒
          </div>

          <h2>Tu carrito está vacío</h2>

          <p>
            Todavía no agregaste productos a tu carrito.
          </p>

          <Link
            className="carrito-ver-productos"
            to="/productos"
          >
            Ver productos
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="carrito-section">
      <div className="carrito-header">
        <span className="carrito-label">
          TU COMPRA
        </span>

        <h2>Carrito de compras</h2>

        <p>
          Revisá los productos antes de continuar.
        </p>
      </div>

      <div className="carrito-layout">
        <div className="carrito-productos">
          {carrito.map((item) => (
            <article
              className="carrito-item"
              key={item.id}
            >
              <div className="carrito-imagen-container">
                <img
                  className="carrito-imagen"
                  src={item.imagen}
                  alt={item.nombre}
                />
              </div>

              <div className="carrito-item-info">
                <h3>{item.nombre}</h3>

                <p className="carrito-precio">
                  ${item.precio.toLocaleString('es-AR')}
                </p>

                <p>
                  Cantidad: {item.cantidad}
                </p>

                <p className="carrito-subtotal">
                  Subtotal:{' '}
                  $
                  {(
                    item.precio * item.cantidad
                  ).toLocaleString('es-AR')}
                </p>

                <button
                  className="eliminar-producto"
                  onClick={() =>
                    eliminarDelCarrito(item.id)
                  }
                >
                  Eliminar producto
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="carrito-resumen">
          <h3>Resumen de compra</h3>

          <div className="resumen-linea">
            <span>Productos</span>

            <span>
              {carrito.reduce(
                (total, item) =>
                  total + item.cantidad,
                0
              )}
            </span>
          </div>

          <div className="resumen-total">
            <span>Total</span>

            <span>
              ${precioTotal.toLocaleString('es-AR')}
            </span>
          </div>

          <button
            className="vaciar-carrito"
            onClick={vaciarCarrito}
          >
            Vaciar carrito
          </button>

          <Link
            className="seguir-comprando"
            to="/productos"
          >
            ← Seguir comprando
          </Link>
        </aside>
      </div>
    </section>
  )
}

export default Cart