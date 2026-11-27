import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import styled from 'styled-components'

const ProductoCard = styled.article`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .producto-info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .producto-boton {
    margin-top: auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
`

const EstadoStock = styled.span`
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  gap: 6px;
  padding: 5px 10px;
  margin-bottom: 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;

  background-color: ${({ $disponible }) =>
    $disponible ? '#dcfce7' : '#fee2e2'};

  color: ${({ $disponible }) =>
    $disponible ? '#166534' : '#991b1b'};

  &::before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;

    background-color: ${({ $disponible }) =>
      $disponible ? '#16a34a' : '#dc2626'};
  }
`

function Item({
  id,
  nombre,
  descripcion,
  precio,
  stock,
  imagen,
}) {
  const disponible = stock > 0

  return (
    <ProductoCard className="producto-card">
      <div className="producto-imagen-container">
        <img
          className="producto-imagen"
          src={imagen}
          alt={nombre}
          loading="lazy"
          decoding="async"
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

        <EstadoStock $disponible={disponible}>
          {disponible
            ? `Stock disponible: ${stock}`
            : 'Sin stock'}
        </EstadoStock>

        <Link
          className="producto-boton"
          to={`/producto/${id}`}
        >
          Ver detalle
          <FiArrowRight aria-hidden="true" />
        </Link>
      </div>
    </ProductoCard>
  )
}

export default Item