import { Link } from 'react-router-dom'

function Item({
  id,
  nombre,
  descripcion,
  precio,
  stock,
  imagen
}) {
  return (
    <article className="producto-card">
      <div className="producto-imagen-container">
        <img
          className="producto-imagen"
          src={imagen}
          alt={nombre}
        />
      </div>

      <div className="producto-info">
        <h3>{nombre}</h3>

        <p className="producto-descripcion">
          {descripcion}
        </p>

        <p className="producto-precio">
          ${precio.toLocaleString('es-AR')}
        </p>

        <p className="producto-stock">
          Stock disponible: {stock}
        </p>

        <Link
          className="producto-boton"
          to={`/producto/${id}`}
        >
          Ver detalle
        </Link>
      </div>
    </article>
  )
}

export default Item