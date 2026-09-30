import { useEffect, useState } from 'react'
import ItemList from '../ItemList/ItemList'

function ItemListContainer() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    fetch('/productos.json')
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setProductos(datos)
      })
      .catch((error) => {
        console.error('Error al cargar los productos:', error)
      })
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

      <ItemList productos={productos} />
    </section>
  )
}

export default ItemListContainer