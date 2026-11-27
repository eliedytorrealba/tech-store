import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Item from '../Item/Item'

function ItemList({ productos }) {
  return (
    <Container
      fluid
      className="catalogo-bootstrap"
    >
      <Row
        xs={1}
        sm={2}
        lg={3}
        className="g-4"
      >
        {productos.map((producto) => (
          <Col
            key={producto.id}
            className="catalogo-columna"
          >
            <Item {...producto} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default ItemList