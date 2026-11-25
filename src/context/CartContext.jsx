
import { useState } from 'react'
import { CartContext } from './CartContext'

function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([])

  const getCantidadActual = (id) => {
    const producto = carrito.find((item) => item.id === id)
    return producto ? producto.cantidad : 0
  }

  const addToCart = (producto, cantidad) => {
    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      alert('La cantidad seleccionada no es válida.')
      return
    }

    const cantidadActual = getCantidadActual(producto.id)

    if (cantidadActual + cantidad > producto.stock) {
      alert('No hay suficiente stock disponible.')
      return
    }

    setCarrito((carritoAnterior) => {
      const productoEnCarrito = carritoAnterior.find(
        (item) => item.id === producto.id
      )

      const nuevaCantidad =
        (productoEnCarrito?.cantidad || 0) + cantidad

      if (nuevaCantidad > producto.stock) {
        return carritoAnterior
      }

      if (productoEnCarrito) {
        return carritoAnterior.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: nuevaCantidad }
            : item
        )
      }

      return [
        ...carritoAnterior,
        {
          ...producto,
          cantidad
        }
      ]
    })
  }

  const eliminarDelCarrito = (id) => {
    setCarrito((carritoAnterior) =>
      carritoAnterior.filter((item) => item.id !== id)
    )
  }

  const vaciarCarrito = () => {
    setCarrito([])
  }

  const cantidadTotal = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  )

  const precioTotal = carrito.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  )

  return (
    <CartContext.Provider
      value={{
        carrito,
        addToCart,
        getCantidadActual,
        eliminarDelCarrito,
        vaciarCarrito,
        cantidadTotal,
        precioTotal
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
