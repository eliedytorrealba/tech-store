
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth'

import {
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

import { auth, db } from '../config/firebase'

export async function obtenerPerfil(uid) {
  const referencia = doc(db, 'usuarios', uid)
  const documento = await getDoc(referencia)

  if (!documento.exists()) {
    return null
  }

  return {
    ...documento.data(),
    uid: documento.id
  }
}

export async function asegurarPerfil(usuario, nombre) {
  const perfilExistente = await obtenerPerfil(usuario.uid)

  if (perfilExistente) {
    return perfilExistente
  }

  const perfil = {
    nombre: (
      nombre ||
      usuario.displayName ||
      usuario.email?.split('@')[0] ||
      'Cliente'
    ).trim().slice(0, 100),

    email: usuario.email,
    rol: 'cliente'
  }

  await setDoc(
    doc(db, 'usuarios', usuario.uid),
    perfil
  )

  return {
    ...perfil,
    uid: usuario.uid
  }
}

export async function registrarUsuario(nombre, email, password) {
  const credenciales = await createUserWithEmailAndPassword(
    auth,
    email.trim(),
    password
  )

  await updateProfile(credenciales.user, {
    displayName: nombre.trim()
  })

  return credenciales.user
}

export async function iniciarSesion(email, password) {
  const credenciales = await signInWithEmailAndPassword(
    auth,
    email.trim(),
    password
  )

  return credenciales.user
}

export function cerrarSesion() {
  return signOut(auth)
}

export function observarSesion(callback) {
  return onAuthStateChanged(auth, callback)
}

export function obtenerMensajeError(error) {
  const mensajes = {
    'auth/email-already-in-use':
      'Este correo electrónico ya está registrado.',

    'auth/invalid-email':
      'El correo electrónico no es válido.',

    'auth/weak-password':
      'La contraseña debe tener al menos 6 caracteres.',

    'auth/invalid-credential':
      'El correo electrónico o la contraseña son incorrectos.',

    'auth/user-not-found':
      'El correo electrónico o la contraseña son incorrectos.',

    'auth/wrong-password':
      'El correo electrónico o la contraseña son incorrectos.',

    'auth/too-many-requests':
      'Demasiados intentos. Intenta nuevamente más tarde.',

    'auth/network-request-failed':
      'No se pudo conectar. Verifica tu conexión a Internet.',

    'auth/user-disabled':
      'Esta cuenta se encuentra deshabilitada.',

    'permission-denied':
      'No tienes permisos para realizar esta operación.'
  }

  return mensajes[error?.code] ||
    'Ocurrió un error inesperado. Intenta nuevamente.'
}
