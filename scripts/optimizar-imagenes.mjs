import sharp from 'sharp'
import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'

const carpeta = path.resolve('public/imagenes')

async function optimizarImagenes() {
  const archivos = await readdir(carpeta)

  const imagenesPNG = archivos.filter(
    (archivo) => archivo.toLowerCase().endsWith('.png')
  )

  let totalOriginal = 0
  let totalOptimizado = 0
  let procesadas = 0
  let errores = 0

  console.log('\nIniciando optimización de imágenes...\n')

  for (const archivo of imagenesPNG) {
    const rutaOriginal = path.join(carpeta, archivo)

    const nombreWebP =
      path.parse(archivo).name + '.webp'

    const rutaOptimizada = path.join(carpeta, nombreWebP)

    try {
      await sharp(rutaOriginal)
        .resize({
          width: 800,
          height: 800,
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({
          quality: 85,
          effort: 6
        })
        .toFile(rutaOptimizada)

      const original = await stat(rutaOriginal)
      const optimizada = await stat(rutaOptimizada)

      const reduccion =
        (1 - optimizada.size / original.size) * 100

      totalOriginal += original.size
      totalOptimizado += optimizada.size
      procesadas++

      console.log(`OK: ${nombreWebP}`)
      console.log(
        `  Original: ${(original.size / 1024).toFixed(2)} KB`
      )
      console.log(
        `  Optimizada: ${(optimizada.size / 1024).toFixed(2)} KB`
      )
      console.log(
        `  Reducción: ${reduccion.toFixed(2)}%\n`
      )
    } catch (error) {
      errores++
      console.error(`Error al procesar ${archivo}:`, error.message)
    }
  }

  console.log('====================================')
  console.log('RESUMEN DE OPTIMIZACIÓN')
  console.log('====================================')
  console.log(`Imágenes encontradas: ${imagenesPNG.length}`)
  console.log(`Imágenes procesadas: ${procesadas}`)
  console.log(`Errores: ${errores}`)
  console.log(
    `Peso original: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`
  )
  console.log(
    `Peso optimizado: ${(totalOptimizado / 1024 / 1024).toFixed(2)} MB`
  )

  if (totalOriginal > 0) {
    const reduccionTotal =
      (1 - totalOptimizado / totalOriginal) * 100

    console.log(
      `Reducción total: ${reduccionTotal.toFixed(2)}%`
    )
  }

  if (errores > 0 || procesadas === 0) {
    process.exitCode = 1
  }

  console.log('====================================\n')
}

optimizarImagenes().catch((error) => {
  console.error('Error durante la optimización:', error)
  process.exitCode = 1
})