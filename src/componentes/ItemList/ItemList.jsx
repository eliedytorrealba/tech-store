import Item from '../Item/Item'

function ItemList({ productos }) {
  return (
    <div className="productos-grid">
      {productos.map((producto) => (
        <Item
          key={producto.id}
          {...producto}
        />
      ))}
    </div>
  )
}

export default ItemList