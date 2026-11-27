import { useEffect, useRef } from 'react'

const ConfirmarEliminacion = ({
  producto,
  onConfirmar,
  onCancelar,
  eliminando,
  error,
}) => {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialogo = dialogRef.current

    if (!dialogo.open) {
      dialogo.showModal()
    }

    return () => {
      if (dialogo.open) {
        dialogo.close()
      }
    }
  }, [])

  const manejarCancelacion = (event) => {
    event.preventDefault()

    if (!eliminando) {
      onCancelar()
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="gestion-modal"
      aria-labelledby="titulo-eliminacion"
      aria-describedby="descripcion-eliminacion"
      onCancel={manejarCancelacion}
    >
      <div className="gestion-modal-contenido">
        <div className="gestion-modal-icono" aria-hidden="true">
          !
        </div>

        <h2 id="titulo-eliminacion">
          Eliminar producto
        </h2>

        <p id="descripcion-eliminacion">
          ¿Estás seguro de que deseas eliminar{' '}
          <strong>{producto.nombre}</strong>?
        </p>

        <p className="gestion-texto-secundario">
          Esta acción no se puede deshacer.
        </p>

        {error && (
          <div className="gestion-alerta error" role="alert">
            {error}
          </div>
        )}

        <div className="gestion-form-acciones">
          <button
            type="button"
            className="gestion-btn secundario"
            onClick={onCancelar}
            disabled={eliminando}
          >
            Cancelar
          </button>

          <button
            type="button"
            className="gestion-btn peligro"
            onClick={onConfirmar}
            disabled={eliminando}
          >
            {eliminando ? 'Eliminando...' : 'Eliminar producto'}
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default ConfirmarEliminacion