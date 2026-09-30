import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ItemDetail from '../ItemDetail/ItemDetail'

function ItemDetailContainer() {
  const [producto, setProducto] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    fetch('/productos.json')
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        const productoEncontrado = datos.find(
          (producto) => producto.id === Number(id)
        )

        setProducto(productoEncontrado)
      })
      .catch((error) => {
        console.error('Error al cargar el producto:', error)
      })
  }, [id])

  if (!producto) {
    return <p>Cargando producto...</p>
  }

  return (
    <section className="app">
      <ItemDetail producto={producto} />
    </section>
  )
}

export default ItemDetailContainer