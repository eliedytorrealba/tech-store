import { Helmet } from 'react-helmet-async'

function SEO({
  titulo,
  descripcion = 'Tech Store: notebooks, smartphones, consolas, accesorios y productos tecnológicos.',
  privado = false,
}) {
  const tituloCompleto = titulo
    ? `${titulo} | Tech Store`
    : 'Tech Store | Tecnología para tu día a día'

  return (
    <Helmet>
      <html lang="es" />

      <title>{tituloCompleto}</title>

      <meta
        name="description"
        content={descripcion}
      />

      <meta
        name="robots"
        content={privado ? 'noindex, nofollow' : 'index, follow'}
      />

      <meta
        property="og:title"
        content={tituloCompleto}
      />

      <meta
        property="og:description"
        content={descripcion}
      />

      <meta
        property="og:type"
        content="website"
      />
    </Helmet>
  )
}

export default SEO