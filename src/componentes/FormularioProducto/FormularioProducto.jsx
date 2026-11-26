import { useState } from 'react'

const productoInicial = {
  nombre: '',
  descripcion: '',
  precio: '',
  stock: '',
  categoria: '',
  imagen: '',
}

const FormularioProducto = ({
  producto,
  onGuardar,
  onCancelar,
  guardando,
  errorServidor,
}) => {
  const [formulario, setFormulario] = useState(
    producto
      ? {
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: String(producto.precio),
          stock: String(producto.stock),
          categoria: producto.categoria,
          imagen: producto.imagen,
        }
      : { ...productoInicial }
  )

  const [errores, setErrores] = useState({})

  const esEdicion = Boolean(producto)

  const manejarCambio = (event) => {
    const { name, value } = event.target

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }))

    setErrores((anteriores) => ({
      ...anteriores,
      [name]: '',
    }))
  }

  const validarFormulario = () => {
    const nuevosErrores = {}

    if (!formulario.nombre.trim()) {
      nuevosErrores.nombre = 'Ingresa el nombre del producto.'
    }

    if (!formulario.descripcion.trim()) {
      nuevosErrores.descripcion = 'Ingresa una descripción.'
    }

    if (
      formulario.precio.trim() === '' ||
      !Number.isFinite(Number(formulario.precio)) ||
      Number(formulario.precio) <= 0
    ) {
      nuevosErrores.precio = 'El precio debe ser mayor a cero.'
    }

    if (
      formulario.stock.trim() === '' ||
      !Number.isSafeInteger(Number(formulario.stock)) ||
      Number(formulario.stock) < 0
    ) {
      nuevosErrores.stock = 'Ingresa un número entero mayor o igual a cero.'
    }

    if (!formulario.categoria.trim()) {
      nuevosErrores.categoria = 'Ingresa una categoría.'
    }

    if (!formulario.imagen.trim()) {
      nuevosErrores.imagen = 'Ingresa la ruta o URL de la imagen.'
    } else if (
      !/^(https?:\/\/|\/imagenes\/)/i.test(formulario.imagen.trim())
    ) {
      nuevosErrores.imagen =
        'Utiliza una URL HTTP/HTTPS o una ruta /imagenes/.'
    }

    setErrores(nuevosErrores)

    return Object.keys(nuevosErrores).length === 0
  }

  const manejarEnvio = async (event) => {
    event.preventDefault()

    if (guardando || !validarFormulario()) {
      return
    }

    await onGuardar({
      ...formulario,
      precio: Number(formulario.precio),
      stock: Number(formulario.stock),
    })
  }

  const campos = [
    {
      nombre: 'nombre',
      etiqueta: 'Nombre del producto',
      tipo: 'text',
      maxLength: 150,
      placeholder: 'Ej. Teclado mecánico',
    },
    {
      nombre: 'precio',
      etiqueta: 'Precio ($)',
      tipo: 'number',
      min: '0.01',
      step: '0.01',
      placeholder: '0.00',
    },
    {
      nombre: 'stock',
      etiqueta: 'Stock disponible',
      tipo: 'number',
      min: '0',
      step: '1',
      placeholder: '0',
    },
    {
      nombre: 'categoria',
      etiqueta: 'Categoría',
      tipo: 'text',
      maxLength: 80,
      placeholder: 'Ej. accesorios',
    },
    {
      nombre: 'imagen',
      etiqueta: 'Ruta o URL de la imagen',
      tipo: 'text',
      maxLength: 2048,
      placeholder: '/imagenes/producto.webp',
    },
  ]

  return (
    <section className="gestion-formulario">
      <h2>
        {esEdicion ? 'Editar producto' : 'Nuevo producto'}
      </h2>

      <p className="gestion-texto-secundario">
        Completa todos los campos obligatorios.
      </p>

      {errorServidor && (
        <div className="gestion-alerta error" role="alert">
          {errorServidor}
        </div>
      )}

      <form onSubmit={manejarEnvio} noValidate>
        <div className="gestion-form-grid">
          {campos.map((campo) => (
            <div
              key={campo.nombre}
              className={`gestion-campo ${
                campo.nombre === 'imagen' ? 'campo-completo' : ''
              }`}
            >
              <label htmlFor={`producto-${campo.nombre}`}>
                {campo.etiqueta} *
              </label>

              <input
                id={`producto-${campo.nombre}`}
                name={campo.nombre}
                type={campo.tipo}
                value={formulario[campo.nombre]}
                onChange={manejarCambio}
                placeholder={campo.placeholder}
                maxLength={campo.maxLength}
                min={campo.min}
                step={campo.step}
                disabled={guardando}
                required
                aria-invalid={Boolean(errores[campo.nombre])}
                aria-describedby={
                  errores[campo.nombre]
                    ? `error-${campo.nombre}`
                    : undefined
                }
              />

              {errores[campo.nombre] && (
                <span
                  id={`error-${campo.nombre}`}
                  className="gestion-error-campo"
                  role="alert"
                >
                  {errores[campo.nombre]}
                </span>
              )}
            </div>
          ))}

          <div className="gestion-campo campo-completo">
            <label htmlFor="producto-descripcion">
              Descripción *
            </label>

            <textarea
              id="producto-descripcion"
              name="descripcion"
              value={formulario.descripcion}
              onChange={manejarCambio}
              rows={4}
              maxLength={1000}
              disabled={guardando}
              required
              aria-invalid={Boolean(errores.descripcion)}
              aria-describedby={
                errores.descripcion
                  ? 'error-descripcion'
                  : undefined
              }
            />

            {errores.descripcion && (
              <span
                id="error-descripcion"
                className="gestion-error-campo"
                role="alert"
              >
                {errores.descripcion}
              </span>
            )}
          </div>
        </div>

        <div className="gestion-form-acciones">
          <button
            type="button"
            className="gestion-btn secundario"
            onClick={onCancelar}
            disabled={guardando}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="gestion-btn primario"
            disabled={guardando}
          >
            {guardando
              ? 'Guardando...'
              : esEdicion
                ? 'Guardar cambios'
                : 'Crear producto'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default FormularioProducto