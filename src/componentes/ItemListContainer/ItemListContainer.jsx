import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../config/firebase'
import ItemList from '../ItemList/ItemList'

function ItemListContainer() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let activo = true

    const cargarProductos = async () => {
      try {
        const productosRef = collection(db, 'productos')
        const snapshot = await getDocs(productosRef)

        const datos = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))

        if (activo) {
          setProductos(datos)
        }
      } catch (error) {
        console.error('Error al cargar los productos:', error)

        if (activo) {
          setError('No se pudieron cargar los productos. Intenta nuevamente.')
        }
      } finally {
        if (activo) {
          setLoading(false)
        }
      }
    }

    cargarProductos()

    return () => {
      activo = false
    }
  }, [])

  return (
    <section className="productos-section">
      <div className="productos-header">
        <span className="productos-label">TECNOLOGÍA</span>
        <h2>Nuestros productos</h2>
        <p>
          Encontrá tecnología para trabajar, estudiar y disfrutar.
        </p>
      </div>

      {loading ? (
        <p role="status">Cargando productos...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : productos.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <ItemList productos={productos} />
      )}
    </section>
  )
}

export default ItemListContainer
