import { useState } from 'react'

function ItemCount({ stock, inicial = 1, onAdd }) {
  const [cantidad, setCantidad] = useState(inicial)

  const incrementar = () => {
    if (cantidad < stock) {
      setCantidad(cantidad + 1)
    }
  }

  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1)
    }
  }

  return (
    <div className="item-count">
      <div className="contador">
        <button
          className="contador-boton"
          onClick={decrementar}
        >
          −
        </button>

        <span className="contador-cantidad">
          {cantidad}
        </span>

        <button
          className="contador-boton"
          onClick={incrementar}
        >
          +
        </button>
      </div>

      <button
        className="agregar-carrito"
        onClick={() => onAdd(cantidad)}
      >
        Agregar al carrito
      </button>
    </div>
  )
}

export default ItemCount