import { useState } from 'react'

function ItemCount({ stock, inicial = 1, onAdd }) {
  const [cantidad, setCantidad] = useState(inicial)

  const cantidadDisponible = Math.max(
    0,
    Math.min(cantidad, stock)
  )

  const incrementar = () => {
    if (cantidadDisponible < stock) {
      setCantidad(cantidadDisponible + 1)
    }
  }

  const decrementar = () => {
    if (cantidadDisponible > 1) {
      setCantidad(cantidadDisponible - 1)
    }
  }

  const manejarAgregar = () => {
    if (cantidadDisponible > 0) {
      onAdd(cantidadDisponible)
      setCantidad(inicial)
    }
  }

  return (
    <div className="item-count">
      <div className="contador">
        <button
          type="button"
          className="contador-boton"
          onClick={decrementar}
          disabled={cantidadDisponible <= 1}
          aria-label="Disminuir cantidad"
        >
          −
        </button>

        <span
          className="contador-cantidad"
          aria-live="polite"
        >
          {cantidadDisponible}
        </span>

        <button
          type="button"
          className="contador-boton"
          onClick={incrementar}
          disabled={cantidadDisponible >= stock}
          aria-label="Aumentar cantidad"
        >
          +
        </button>
      </div>

      <button
        type="button"
        className="agregar-carrito"
        onClick={manejarAgregar}
        disabled={stock <= 0}
      >
        {stock > 0
          ? 'Agregar al carrito'
          : 'Sin stock disponible'}
      </button>
    </div>
  )
}

export default ItemCount
