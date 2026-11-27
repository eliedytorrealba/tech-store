import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingCart } from 'react-icons/fi'
import styled from 'styled-components'

import { CartContext } from '../../context/CartContext'

const CarritoLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;

  svg {
    font-size: 20px;
    flex-shrink: 0;
  }
`

const ContadorCarrito = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  padding: 0 6px;
  border-radius: 999px;
  background-color: #2563eb;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
`

function CartWidget() {
  const { cantidadTotal } = useContext(CartContext)

  return (
    <CarritoLink
      to="/carrito"
      aria-label={`Carrito de compras, ${cantidadTotal} productos`}
    >
      <FiShoppingCart aria-hidden="true" />

      <ContadorCarrito aria-hidden="true">
        {cantidadTotal}
      </ContadorCarrito>
    </CarritoLink>
  )
}

export default CartWidget