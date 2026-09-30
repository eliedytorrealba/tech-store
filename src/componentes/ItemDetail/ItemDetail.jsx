import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import ItemCount from '../ItemCount/ItemCount'

function ItemDetail({ producto }) {
  const { addToCart } = useContext(CartContext)

  const manejarAgregar = (cantidad) => {
    addToCart(producto, cantidad)
  }

  return (
    <section className="detalle-producto">
      <Link
        className="volver-productos"
        to="/productos"
      >
        ← Volver a productos
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
            Stock disponible: {producto.stock}
          </p>

          <ItemCount
            stock={producto.stock}
            inicial={1}
            onAdd={manejarAgregar}
          />
        </div>
      </div>
    </section>
  )
}

export default ItemDetail