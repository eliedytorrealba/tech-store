import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { CartContext } from '../../context/CartContext'
import ItemCount from '../ItemCount/ItemCount'

function ItemDetail({ producto }) {
  const { addToCart, getCantidadActual } = useContext(CartContext)

  const cantidadEnCarrito = getCantidadActual(producto.id)

  const stockDisponible = Math.max(
    0,
    producto.stock - cantidadEnCarrito
  )

  const manejarAgregar = (cantidad) => {
    addToCart(producto, cantidad)
  }

  return (
    <section className="detalle-producto">
      <Link
        className="volver-productos"
        to="/productos"
      >
        <FiArrowLeft aria-hidden="true" /> Volver a productos
      </Link>

      <div className="detalle-card">
        <div className="detalle-imagen-container">
          <img
            className="detalle-imagen"
            src={producto.imagen}
            alt={producto.nombre}
          />
        </div>

        <div className="detalle-info">
          <span className="detalle-categoria">
            {producto.categoria}
          </span>

          <h2>{producto.nombre}</h2>

          <p className="detalle-descripcion">
            {producto.descripcion}
          </p>

          <p className="detalle-precio">
            ${producto.precio.toLocaleString('es-AR')}
          </p>

          <p className="detalle-stock">
            Stock disponible: {stockDisponible}
          </p>

          {cantidadEnCarrito > 0 && (
            <p className="detalle-stock">
              Unidades en tu carrito: {cantidadEnCarrito}
            </p>
          )}

          <ItemCount
            key={producto.id}
            stock={stockDisponible}
            inicial={1}
            onAdd={manejarAgregar}
          />
        </div>
      </div>
    </section>
  )
}

export default ItemDetail
