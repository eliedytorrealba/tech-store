import { useEffect, useMemo, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import {
  FiSearch,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi'

import { db } from '../../config/firebase'
import ItemList from '../ItemList/ItemList'

import './ItemListContainer.css'

const PRODUCTOS_POR_PAGINA = 3

function normalizarTexto(texto) {
  return String(texto ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function ItemListContainer() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [busqueda, setBusqueda] = useState('')
  const [paginaActual, setPaginaActual] = useState(1)
  const [recarga, setRecarga] = useState(0)

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
          setError(null)
        }
      } catch (error) {
        console.error('Error al cargar los productos:', error)

        if (activo) {
          setError(
            'No se pudieron cargar los productos. Intenta nuevamente.'
          )
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
  }, [recarga])

  const productosFiltrados = useMemo(() => {
    const termino = normalizarTexto(busqueda)

    if (!termino) {
      return productos
    }

    const palabras = termino.split(/\s+/)

    return productos.filter((producto) => {
      const contenido = normalizarTexto(
        [
          producto.nombre,
          producto.descripcion,
          producto.categoria,
        ].join(' ')
      )

      return palabras.every((palabra) =>
        contenido.includes(palabra)
      )
    })
  }, [productos, busqueda])

  const totalResultados = productosFiltrados.length

  const totalPaginas = Math.ceil(
    totalResultados / PRODUCTOS_POR_PAGINA
  )

  const paginaVisible = Math.min(
    paginaActual,
    Math.max(1, totalPaginas)
  )

  const indiceInicial =
    (paginaVisible - 1) * PRODUCTOS_POR_PAGINA

  const indiceFinal = Math.min(
    indiceInicial + PRODUCTOS_POR_PAGINA,
    totalResultados
  )

  const productosPaginados = productosFiltrados.slice(
    indiceInicial,
    indiceFinal
  )

  const manejarBusqueda = (event) => {
    setBusqueda(event.target.value)
    setPaginaActual(1)
  }

  const limpiarBusqueda = () => {
    setBusqueda('')
    setPaginaActual(1)
  }

  const cambiarPagina = (pagina) => {
    if (pagina >= 1 && pagina <= totalPaginas) {
      setPaginaActual(pagina)
    }
  }

  const reintentarCarga = () => {
    setLoading(true)
    setError(null)
    setPaginaActual(1)
    setRecarga((anterior) => anterior + 1)
  }

  return (
    <section className="productos-section">
      <div className="productos-header">
        <span className="productos-label">
          TECNOLOGÍA
        </span>

        <h2>Nuestros productos</h2>

        <p>
          Encontrá tecnología para trabajar,
          estudiar y disfrutar.
        </p>
      </div>

      {loading ? (
        <div className="catalogo-estado" role="status">
          <span
            className="auth-spinner"
            aria-hidden="true"
          />

          <p>Cargando productos...</p>
        </div>
      ) : error ? (
        <div className="catalogo-estado" role="alert">
          <p>{error}</p>

          <button
            type="button"
            className="catalogo-boton-primario"
            onClick={reintentarCarga}
          >
            Reintentar
          </button>
        </div>
      ) : productos.length === 0 ? (
        <div className="catalogo-estado">
          <h3>No hay productos disponibles</h3>

          <p>
            Próximamente encontrarás nuevos productos.
          </p>
        </div>
      ) : (
        <>
          <div className="catalogo-filtros">
            <label
              htmlFor="buscar-productos"
              className="catalogo-busqueda-label"
            >
              Buscar productos
            </label>

            <div className="catalogo-busqueda">
              <FiSearch
                className="catalogo-busqueda-icono"
                aria-hidden="true"
              />

              <input
                id="buscar-productos"
                type="search"
                value={busqueda}
                onChange={manejarBusqueda}
                placeholder="Buscar por nombre, descripción o categoría..."
                autoComplete="off"
              />

              {busqueda && (
                <button
                  type="button"
                  className="catalogo-limpiar"
                  onClick={limpiarBusqueda}
                  aria-label="Limpiar búsqueda"
                  title="Limpiar búsqueda"
                >
                  <FiX aria-hidden="true" />
                </button>
              )}
            </div>

            <div
              className="catalogo-resultados"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {totalResultados > 0
                ? `Mostrando ${indiceInicial + 1}–${indiceFinal} de ${totalResultados} ${
                    totalResultados === 1
                      ? 'producto'
                      : 'productos'
                  }`
                : '0 productos encontrados'}
            </div>
          </div>

          {totalResultados === 0 ? (
            <div className="catalogo-estado catalogo-sin-resultados">
              <FiSearch
                className="catalogo-vacio-icono"
                aria-hidden="true"
              />

              <h3>No encontramos productos</h3>

              <p>
                No hay coincidencias para
                {' '}"{busqueda.trim()}".
              </p>

              <p>
                Probá con otro nombre, descripción
                o categoría.
              </p>

              <button
                type="button"
                className="catalogo-boton-primario"
                onClick={limpiarBusqueda}
              >
                Limpiar búsqueda
              </button>
            </div>
          ) : (
            <>
              <ItemList productos={productosPaginados} />

              {totalPaginas > 1 && (
                <nav
                  className="catalogo-paginacion"
                  aria-label="Paginación de productos"
                >
                  <button
                    type="button"
                    className="catalogo-pagina-boton"
                    disabled={paginaVisible === 1}
                    onClick={() =>
                      cambiarPagina(paginaVisible - 1)
                    }
                  >
                    <FiChevronLeft aria-hidden="true" />
                    <span>Anterior</span>
                  </button>

                  <div className="catalogo-paginas">
                    {Array.from(
                      { length: totalPaginas },
                      (_, indice) => indice + 1
                    ).map((pagina) => (
                      <button
                        key={pagina}
                        type="button"
                        className={`catalogo-pagina-boton ${
                          paginaVisible === pagina
                            ? 'activa'
                            : ''
                        }`}
                        aria-label={`Página ${pagina}`}
                        aria-current={
                          paginaVisible === pagina
                            ? 'page'
                            : undefined
                        }
                        onClick={() =>
                          cambiarPagina(pagina)
                        }
                      >
                        {pagina}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="catalogo-pagina-boton"
                    disabled={
                      paginaVisible === totalPaginas
                    }
                    onClick={() =>
                      cambiarPagina(paginaVisible + 1)
                    }
                  >
                    <span>Siguiente</span>
                    <FiChevronRight aria-hidden="true" />
                  </button>
                </nav>
              )}
            </>
          )}
        </>
      )}
    </section>
  )
}

export default ItemListContainer
