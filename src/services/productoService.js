import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore'

import { db } from '../config/firebase'

const productosRef = collection(db, 'productos')

export const obtenerProductos = async () => {
  const snapshot = await getDocs(productosRef)

  return snapshot.docs
    .map((documento) => ({
      ...documento.data(),
      id: documento.id,
    }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre))
}

export const obtenerProductoPorId = async (id) => {
  const snapshot = await getDoc(doc(db, 'productos', id))

  if (!snapshot.exists()) {
    return null
  }

  return {
    ...snapshot.data(),
    id: snapshot.id,
  }
}

const prepararProducto = (producto) => {
  const datos = {
    nombre: String(producto.nombre ?? '').trim(),
    descripcion: String(producto.descripcion ?? '').trim(),
    precio: Number(producto.precio),
    stock: Number(producto.stock),
    categoria: String(producto.categoria ?? '').trim(),
    imagen: String(producto.imagen ?? '').trim(),
  }

  if (!datos.nombre || datos.nombre.length > 150) {
    throw new Error('El nombre es obligatorio y admite hasta 150 caracteres.')
  }

  if (!datos.descripcion || datos.descripcion.length > 1000) {
    throw new Error('La descripción es obligatoria y admite hasta 1000 caracteres.')
  }

  if (!Number.isFinite(datos.precio) || datos.precio <= 0) {
    throw new Error('El precio debe ser mayor a cero.')
  }

  if (
    String(producto.stock ?? '').trim() === '' ||
    !Number.isSafeInteger(datos.stock) ||
    datos.stock < 0
  ) {
    throw new Error('El stock debe ser un número entero mayor o igual a cero.')
  }

  if (!datos.categoria || datos.categoria.length > 80) {
    throw new Error('La categoría es obligatoria y admite hasta 80 caracteres.')
  }

  if (!datos.imagen || datos.imagen.length > 2048) {
    throw new Error('La imagen es obligatoria y admite hasta 2048 caracteres.')
  }

  return datos
}

export const crearProducto = async (producto) => {
  const datos = prepararProducto(producto)
  const documento = await addDoc(productosRef, datos)

  return {
    ...datos,
    id: documento.id,
  }
}

export const actualizarProducto = async (id, producto) => {
  const datos = prepararProducto(producto)

  await updateDoc(doc(db, 'productos', id), datos)

  return {
    ...datos,
    id,
  }
}

export const eliminarProducto = async (id) => {
  await deleteDoc(doc(db, 'productos', id))
}

export const obtenerMensajeErrorProducto = (error) => {
  switch (error?.code) {
    case 'permission-denied':
      return 'No tienes permisos para realizar esta operación.'

    case 'not-found':
      return 'El producto solicitado no existe.'

    case 'unavailable':
      return 'El servicio no está disponible. Intenta nuevamente.'

    case 'unauthenticated':
      return 'Debes iniciar sesión para realizar esta operación.'

    default:
      return error instanceof Error && !error.code
        ? error.message
        : 'Ocurrió un error al gestionar el producto.'
  }
}