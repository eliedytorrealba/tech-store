import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { CartContext } from '../../context/CartContext'
import { AuthContext } from '../../context/AuthContext'

function Cart() {
  const {
    carrito,
    eliminarDelCarrito,
    vaciarCarrito,
    cantidadTotal,
    precioTotal
  } = useContext(CartContext)

  const {
    autenticado,
    cargando,
    errorSesion
  } = useContext(AuthContext)

  const navigate = useNavigate()

  const finalizarCompra = () => {
    if (carrito.length === 0 || cargando) {
      return
    }

    if (!autenticado) {
      navigate('/login', {
        state: { from: '/carrito' }
      })

      return
    }

    alert(
      `¡Compra simulada realizada con éxito!\n\n` +
      `Productos: ${cantidadTotal}\n` +
      `Total: $${precioTotal.toLocaleString('es-AR')}\n\n` +
      `¡Gracias por comprar en Tech Store!`
    )

    vaciarCarrito()
    navigate('/')
  }

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
                  type="button"
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

            <span>{cantidadTotal}</span>
          </div>

          <div className="resumen-total">
            <span>Total</span>

            <span>
              ${precioTotal.toLocaleString('es-AR')}
            </span>
          </div>

          {!autenticado && !cargando && (
            <p className="carrito-aviso-auth">
              Inicia sesión para finalizar tu compra.
              Tus productos permanecerán en el carrito.
            </p>
          )}

          {errorSesion && (
            <p className="auth-error" role="alert">
              {errorSesion}
            </p>
          )}

          <button
            type="button"
            className="finalizar-compra"
            onClick={finalizarCompra}
            disabled={cargando}
          >
            {cargando
              ? 'Verificando sesión...'
              : autenticado
                ? 'Finalizar compra'
                : 'Iniciar sesión para comprar'}
          </button>

          <button
            type="button"
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
