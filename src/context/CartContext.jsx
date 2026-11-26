import { useEffect, useState } from 'react'
import { CartContext } from './CartContext'

const CART_STORAGE_KEY = 'tech-store-carrito'

const IMAGENES_MIGRADAS = {
  '/imagenes/auriculares-bluetooth.png':
    '/imagenes/auriculares-bluetooth.webp',

  '/imagenes/monitor-samsung.png':
    '/imagenes/monitor-samsung.webp',

  '/imagenes/mouse-logitech.png':
    '/imagenes/mouse-logitech.webp',

  '/imagenes/notebook-lenovo.png':
    '/imagenes/notebook-lenovo.webp',

  '/imagenes/playstation-5.png':
    '/imagenes/playstation-5.webp',

  '/imagenes/samsung-galaxy-s25.png':
    '/imagenes/samsung-galaxy-s25.webp'
}

function migrarImagen(imagen) {
  if (
    typeof imagen === 'string' &&
    Object.hasOwn(IMAGENES_MIGRADAS, imagen)
  ) {
    return IMAGENES_MIGRADAS[imagen]
  }

  return imagen
}

function recuperarCarrito() {
  try {
    const carritoGuardado = localStorage.getItem(CART_STORAGE_KEY)

    if (!carritoGuardado) {
      return []
    }

    const datos = JSON.parse(carritoGuardado)

    if (!Array.isArray(datos)) {
      return []
    }

    return datos
      .filter(
        (item) =>
          item &&
          typeof item.id === 'string' &&
          typeof item.nombre === 'string' &&
          Number.isFinite(item.precio) &&
          item.precio >= 0 &&
          Number.isInteger(item.stock) &&
          Number.isInteger(item.cantidad) &&
          item.cantidad > 0 &&
          item.cantidad <= item.stock
      )
      .map((item) => ({
        ...item,
        imagen: migrarImagen(item.imagen)
      }))
  } catch (error) {
    console.error('Error al recuperar el carrito:', error)
    return []
  }
}

function CartProvider({ children }) {
  const [carrito, setCarrito] = useState(recuperarCarrito)

  useEffect(() => {
    try {
      if (carrito.length === 0) {
        localStorage.removeItem(CART_STORAGE_KEY)
      } else {
        localStorage.setItem(
          CART_STORAGE_KEY,
          JSON.stringify(carrito)
        )
      }
    } catch (error) {
      console.error('Error al guardar el carrito:', error)
    }
  }, [carrito])

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

    const productoActualizado = {
      ...producto,
      imagen: migrarImagen(producto.imagen)
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
            ? {
                ...item,
                ...productoActualizado,
                cantidad: nuevaCantidad
              }
            : item
        )
      }

      return [
        ...carritoAnterior,
        {
          ...productoActualizado,
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