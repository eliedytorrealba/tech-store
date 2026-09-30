import { useState } from 'react'
import { CartContext } from './CartContext'

function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([])

  const addToCart = (producto, cantidad) => {
    const productoEnCarrito = carrito.find(
      (item) => item.id === producto.id
    )

    if (productoEnCarrito) {
      const nuevaCantidad =
        productoEnCarrito.cantidad + cantidad

      if (nuevaCantidad > producto.stock) {
        alert('No hay suficiente stock disponible.')
        return
      }

      const carritoActualizado = carrito.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: nuevaCantidad }
          : item
      )

      setCarrito(carritoActualizado)
    } else {
      if (cantidad > producto.stock) {
        alert('No hay suficiente stock disponible.')
        return
      }

      setCarrito([
        ...carrito,
        {
          ...producto,
          cantidad: cantidad
        }
      ])
    }
  }

  const eliminarDelCarrito = (id) => {
    const carritoActualizado = carrito.filter(
      (item) => item.id !== id
    )

    setCarrito(carritoActualizado)
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