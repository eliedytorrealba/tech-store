import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import ItemDetail from '../ItemDetail/ItemDetail'
import SEO from '../SEO/SEO'

function ItemDetailContainer() {
  const { id } = useParams()

  const [resultado, setResultado] = useState(null)

  useEffect(() => {
    let activo = true

    const cargarProducto = async () => {
      try {
        const productoRef = doc(db, 'productos', id)
        const snapshot = await getDoc(productoRef)

        if (!activo) return

        if (snapshot.exists()) {
          setResultado({
            id,
            producto: {
              ...snapshot.data(),
              id: snapshot.id,
            },
            error: null,
          })
        } else {
          setResultado({
            id,
            producto: null,
            error: null,
          })
        }
      } catch (error) {
        console.error('Error al cargar el producto:', error)

        if (activo) {
          setResultado({
            id,
            producto: null,
            error: 'No se pudo cargar el producto. Intenta nuevamente.',
          })
        }
      }
    }

    cargarProducto()

    return () => {
      activo = false
    }
  }, [id])

  if (!resultado || resultado.id !== id) {
    return (
      <section className="app">
        <SEO
          titulo="Detalle del producto"
          descripcion="Consultá las características, precio y disponibilidad del producto."
        />

        <p role="status">Cargando producto...</p>
      </section>
    )
  }

  if (resultado.error) {
    return (
      <section className="app">
        <SEO titulo="Error al cargar producto" privado />

        <p role="alert">{resultado.error}</p>

        <Link to="/productos">Volver a productos</Link>
      </section>
    )
  }

  if (!resultado.producto) {
    return (
      <section className="app">
        <SEO titulo="Producto no encontrado" privado />

        <h2>Producto no encontrado</h2>

        <p>El producto solicitado no está disponible.</p>

        <Link to="/productos">Volver a productos</Link>
      </section>
    )
  }

  return (
    <section className="app">
      <SEO
        titulo={resultado.producto.nombre}
        descripcion={resultado.producto.descripcion}
      />

      <ItemDetail producto={resultado.producto} />
    </section>
  )
}

export default ItemDetailContainer