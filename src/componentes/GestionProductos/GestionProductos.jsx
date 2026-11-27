import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'

import FormularioProducto from '../FormularioProducto/FormularioProducto'
import ConfirmarEliminacion from '../ConfirmarEliminacion/ConfirmarEliminacion'

import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  obtenerMensajeErrorProducto,
} from '../../services/productoService'

import './GestionProductos.css'

const formatoPrecio = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 2,
})

const ordenarProductos = (productos) =>
  [...productos].sort((a, b) =>
    a.nombre.localeCompare(b.nombre)
  )

const GestionProductos = () => {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [recarga, setRecarga] = useState(0)
  const [error, setError] = useState('')

  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [productoEditar, setProductoEditar] = useState(null)
  const [guardando, setGuardando] = useState(false)
  const [errorFormulario, setErrorFormulario] = useState('')

  const [productoEliminar, setProductoEliminar] = useState(null)
  const [eliminando, setEliminando] = useState(false)
  const [errorEliminacion, setErrorEliminacion] = useState('')

  useEffect(() => {
    let activo = true

    obtenerProductos()
      .then((datos) => {
        if (activo) {
          setProductos(datos)
          setError('')
        }
      })
      .catch((errorConsulta) => {
        if (activo) {
          setError(obtenerMensajeErrorProducto(errorConsulta))
        }
      })
      .finally(() => {
        if (activo) {
          setCargando(false)
        }
      })

    return () => {
      activo = false
    }
  }, [recarga])

  const recargarProductos = () => {
    setCargando(true)
    setError('')
    setRecarga((anterior) => anterior + 1)
  }

  const abrirNuevoProducto = () => {
    setProductoEditar(null)
    setErrorFormulario('')
    setMostrarFormulario(true)
  }

  const abrirEdicion = (producto) => {
    setProductoEditar(producto)
    setErrorFormulario('')
    setMostrarFormulario(true)
  }

  const cerrarFormulario = () => {
    if (guardando) return

    setMostrarFormulario(false)
    setProductoEditar(null)
    setErrorFormulario('')
  }

  const guardarProducto = async (datos) => {
    setGuardando(true)
    setErrorFormulario('')

    try {
      if (productoEditar) {
        const actualizado = await actualizarProducto(
          productoEditar.id,
          datos
        )

        setProductos((anteriores) =>
          ordenarProductos(
            anteriores.map((producto) =>
              producto.id === actualizado.id
                ? actualizado
                : producto
            )
          )
        )

        toast.success('Producto actualizado correctamente.')
      } else {
        const nuevo = await crearProducto(datos)

        setProductos((anteriores) =>
          ordenarProductos([...anteriores, nuevo])
        )

        toast.success('Producto creado correctamente.')
      }

      setMostrarFormulario(false)
      setProductoEditar(null)
    } catch (errorGuardado) {
      setErrorFormulario(
        obtenerMensajeErrorProducto(errorGuardado)
      )
    } finally {
      setGuardando(false)
    }
  }

  const abrirEliminacion = (producto) => {
    setProductoEliminar(producto)
    setErrorEliminacion('')
  }

  const cancelarEliminacion = () => {
    if (eliminando) return

    setProductoEliminar(null)
    setErrorEliminacion('')
  }

  const confirmarEliminacion = async () => {
    if (!productoEliminar || eliminando) return

    setEliminando(true)
    setErrorEliminacion('')

    try {
      await eliminarProducto(productoEliminar.id)

      setProductos((anteriores) =>
        anteriores.filter(
          (producto) => producto.id !== productoEliminar.id
        )
      )

      setProductoEliminar(null)
      toast.success('Producto eliminado correctamente.')
    } catch (errorBorrado) {
      setErrorEliminacion(
        obtenerMensajeErrorProducto(errorBorrado)
      )
    } finally {
      setEliminando(false)
    }
  }

  const stockTotal = productos.reduce(
    (total, producto) => total + producto.stock,
    0
  )

  const sinStock = productos.filter(
    (producto) => producto.stock === 0
  ).length

  return (
    <section className="gestion-section">
      <header className="gestion-header">
        <div>
          <span className="gestion-etiqueta">
            PANEL DE ADMINISTRACIÓN
          </span>

          <h1>Gestión de productos</h1>

          <p className="gestion-texto-secundario">
            Administra el catálogo de Tech Store.
          </p>
        </div>

        {!mostrarFormulario && (
          <button
            type="button"
            className="gestion-btn primario"
            onClick={abrirNuevoProducto}
            disabled={cargando || Boolean(error)}
          >
            + Nuevo producto
          </button>
        )}
      </header>

      {cargando ? (
        <div className="gestion-estado" role="status">
          <span className="auth-spinner" aria-hidden="true" />
          <p>Cargando productos...</p>
        </div>
      ) : error ? (
        <div className="gestion-estado" role="alert">
          <p>{error}</p>

          <button
            type="button"
            className="gestion-btn primario"
            onClick={recargarProductos}
          >
            Reintentar
          </button>
        </div>
      ) : (
        <>
          <div className="gestion-resumen">
            <article className="gestion-indicador">
              <span>Productos registrados</span>
              <strong>{productos.length}</strong>
            </article>

            <article className="gestion-indicador">
              <span>Unidades en stock</span>
              <strong>{stockTotal}</strong>
            </article>

            <article className="gestion-indicador">
              <span>Productos sin stock</span>
              <strong>{sinStock}</strong>
            </article>
          </div>

          {mostrarFormulario && (
            <FormularioProducto
              key={productoEditar?.id ?? 'nuevo'}
              producto={productoEditar}
              onGuardar={guardarProducto}
              onCancelar={cerrarFormulario}
              guardando={guardando}
              errorServidor={errorFormulario}
            />
          )}

          <div className="gestion-listado">
            <div className="gestion-listado-header">
              <h2>Listado de productos</h2>

              <button
                type="button"
                className="gestion-btn secundario"
                onClick={recargarProductos}
                disabled={mostrarFormulario || eliminando}
              >
                Actualizar listado
              </button>
            </div>

            {productos.length === 0 ? (
              <div className="gestion-estado">
                <p>No hay productos registrados.</p>

                <button
                  type="button"
                  className="gestion-btn primario"
                  onClick={abrirNuevoProducto}
                  disabled={mostrarFormulario}
                >
                  Crear primer producto
                </button>
              </div>
            ) : (
              <div className="gestion-tabla-contenedor">
                <table className="gestion-tabla">
                  <thead>
                    <tr>
                      <th scope="col">Producto</th>
                      <th scope="col">Categoría</th>
                      <th scope="col">Precio</th>
                      <th scope="col">Stock</th>
                      <th scope="col">Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {productos.map((producto) => (
                      <tr key={producto.id}>
                        <td>
                          <div className="gestion-producto">
                            <img
                              src={producto.imagen}
                              alt=""
                              loading="lazy"
                            />

                            <span>{producto.nombre}</span>
                          </div>
                        </td>

                        <td>{producto.categoria}</td>

                        <td>
                          {formatoPrecio.format(producto.precio)}
                        </td>

                        <td>
                          <span
                            className={`gestion-stock ${
                              producto.stock === 0
                                ? 'agotado'
                                : 'disponible'
                            }`}
                          >
                            {producto.stock}
                          </span>
                        </td>

                        <td>
                          <div className="gestion-tabla-acciones">
                            <button
                              type="button"
                              className="gestion-btn editar"
                              onClick={() => abrirEdicion(producto)}
                              disabled={mostrarFormulario || eliminando}
                              aria-label={`Editar ${producto.nombre}`}
                            >
                              Editar
                            </button>

                            <button
                              type="button"
                              className="gestion-btn eliminar"
                              onClick={() => abrirEliminacion(producto)}
                              disabled={mostrarFormulario || eliminando}
                              aria-label={`Eliminar ${producto.nombre}`}
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {productoEliminar && (
        <ConfirmarEliminacion
          producto={productoEliminar}
          onConfirmar={confirmarEliminacion}
          onCancelar={cancelarEliminacion}
          eliminando={eliminando}
          error={errorEliminacion}
        />
      )}
    </section>
  )
}

export default GestionProductos
