
# Tech Store

## Proyecto final - Curso de React JS

Tech Store es una aplicación web de comercio electrónico orientada a la venta de productos tecnológicos, desarrollada con React JS, Vite y Firebase como proyecto final del curso de React JS.

La aplicación permite explorar un catálogo de productos, realizar búsquedas en tiempo real, consultar detalles, gestionar un carrito de compras, registrar usuarios e iniciar sesión.

También cuenta con un panel de administración que permite gestionar los productos mediante operaciones CRUD, con autenticación, autorización basada en roles y reglas de seguridad en Cloud Firestore.

---

## Objetivos del proyecto

- Desarrollar una aplicación web SPA (Single Page Application).
- Implementar componentes reutilizables con React.
- Gestionar estados globales mediante Context API.
- Integrar servicios de autenticación y bases de datos en la nube.
- Implementar navegación dinámica y rutas protegidas.
- Desarrollar operaciones CRUD sobre Cloud Firestore.
- Aplicar buenas prácticas de seguridad, rendimiento y accesibilidad.
- Proporcionar una experiencia de usuario responsive.

---

## Funcionalidades

### Catálogo de productos

- Carga de productos desde Cloud Firestore.
- Visualización de productos mediante componentes reutilizables.
- Búsqueda en tiempo real por nombre, descripción o categoría.
- Búsqueda insensible a mayúsculas, minúsculas y acentos.
- Paginación de tres productos por página.
- Indicador de cantidad de resultados.
- Visualización de precios en formato argentino.
- Indicadores de stock disponible y productos agotados.
- Estados de carga, errores y ausencia de resultados.
- Diseño adaptable a dispositivos móviles, tablets y escritorio.

### Detalle de productos

- Navegación dinámica mediante identificadores de Firestore.
- Visualización de imagen, nombre, descripción, precio y stock.
- Selector de cantidad.
- Validación de cantidades según el stock disponible.
- Prevención de cantidades superiores al stock.
- Incorporación de productos al carrito.
- Manejo de productos inexistentes.

### Carrito de compras

- Gestión global mediante Context API.
- Incorporación y eliminación de productos.
- Contador de productos actualizado en tiempo real.
- Cálculo de cantidades, subtotales y total de compra.
- Opción para vaciar completamente el carrito.
- Persistencia mediante LocalStorage.
- Conservación del carrito al recargar la página.
- Validación de stock al agregar productos.
- Autenticación requerida para finalizar una compra.
- Finalización de compra simulada.
- Notificaciones de acciones mediante React Toastify.

### Autenticación y usuarios

- Registro de usuarios mediante correo electrónico y contraseña.
- Inicio y cierre de sesión con Firebase Authentication.
- Validación de formularios.
- Visualización y ocultamiento de contraseñas.
- Persistencia de la sesión.
- Creación de perfiles en Cloud Firestore.
- Gestión global de autenticación mediante Context API.
- Visualización del perfil del usuario.
- Redirección según el estado de autenticación.
- Manejo de errores de autenticación.
- Protección de rutas según el rol del usuario.

### Administración de productos

Panel de administración disponible exclusivamente para usuarios con rol administrador.

- Visualización de productos registrados.
- Creación de nuevos productos.
- Edición de productos existentes.
- Eliminación de productos.
- Formularios controlados.
- Validación de campos obligatorios.
- Validación de precios y cantidades de stock.
- Modal de confirmación de eliminación.
- Indicadores de cantidad de productos, stock total y productos agotados.
- Notificaciones de operaciones exitosas.
- Manejo de errores.
- Actualización de los datos en Cloud Firestore.
- Diseño responsive del panel administrativo.

### Experiencia de usuario

- Diseño responsive mediante CSS y React Bootstrap.
- Componentes estilizados mediante Styled Components.
- Iconografía mediante React Icons.
- Notificaciones mediante React Toastify.
- Títulos y metadatos dinámicos mediante React Helmet Async.
- Indicadores de carga.
- Mensajes de error y confirmación.
- Navegación mediante teclado.
- Indicadores visibles de foco.
- Etiquetas accesibles en elementos interactivos.
- Compatibilidad con preferencias de movimiento reducido.

---

## Tecnologías utilizadas

| Tecnología | Utilización |
|---|---|
| React JS 19 | Desarrollo de la interfaz de usuario |
| Vite 8 | Entorno de desarrollo y compilación |
| JavaScript ES6+ | Lógica de la aplicación |
| React Router DOM 7 | Navegación y rutas dinámicas |
| Context API | Gestión global de estados |
| Firebase SDK 12 | Integración con servicios Firebase |
| Firebase Authentication | Registro y autenticación de usuarios |
| Cloud Firestore | Almacenamiento de productos y perfiles |
| React Bootstrap | Sistema de grillas responsive |
| Bootstrap 5 | Estilos del sistema de grillas |
| Styled Components | Componentes estilizados |
| React Icons | Iconografía |
| React Helmet Async | Gestión dinámica de títulos y metadatos |
| React Toastify | Notificaciones |
| LocalStorage | Persistencia del carrito |
| HTML5 | Estructura semántica |
| CSS3 | Estilos y diseño responsive |
| Sharp | Optimización de imágenes |
| ESLint | Análisis estático de código |
| Git y GitHub | Control de versiones |
| Lighthouse | Auditorías de calidad web |

Se utiliza React Helmet Async como alternativa a React Helmet para mantener la compatibilidad con React 19.

---

## Rutas de la aplicación

| Ruta | Descripción | Acceso |
|---|---|---|
| `/` | Página de inicio | Público |
| `/productos` | Catálogo de productos | Público |
| `/producto/:id` | Detalle de un producto | Público |
| `/carrito` | Carrito de compras | Público |
| `/login` | Inicio de sesión | Público |
| `/registro` | Registro de usuarios | Público |
| `/perfil` | Perfil del usuario | Cliente / Administrador |
| `/gestion` | Administración de productos | Administrador |
| `*` | Página no encontrada | Público |

La finalización de una compra requiere que el usuario se encuentre autenticado.

---

## Roles y permisos

| Funcionalidad | Visitante | Cliente | Administrador |
|---|---|---|---|
| Visualizar catálogo | Sí | Sí | Sí |
| Consultar productos | Sí | Sí | Sí |
| Buscar productos | Sí | Sí | Sí |
| Gestionar carrito | Sí | Sí | Sí |
| Finalizar compra simulada | No | Sí | Sí |
| Consultar perfil propio | No | Sí | Sí |
| Acceder al panel administrativo | No | No | Sí |
| Crear productos | No | No | Sí |
| Editar productos | No | No | Sí |
| Eliminar productos | No | No | Sí |

Los usuarios registrados desde la aplicación reciben automáticamente el rol `cliente`.

La asignación del rol `admin` se realiza manualmente desde un entorno administrativo autorizado de Firebase.

---

## Arquitectura del proyecto

El proyecto utiliza una arquitectura basada en componentes, separando la interfaz de usuario, la gestión de estados globales, la configuración y los servicios de acceso a Firebase.

### Estructura de directorios

```text
tech-store/
├── public/
│   ├── imagenes/
│   │   ├── auriculares-bluetooth.webp
│   │   ├── monitor-samsung.webp
│   │   ├── mouse-logitech.webp
│   │   ├── notebook-lenovo.webp
│   │   ├── playstation-5.webp
│   │   └── samsung-galaxy-s25.webp
│   ├── favicon.svg
│   ├── icons.svg
│   └── productos.json
├── scripts/
│   └── optimizar-imagenes.mjs
├── src/
│   ├── componentes/
│   │   ├── Cart/
│   │   ├── CartWidget/
│   │   ├── ConfirmarEliminacion/
│   │   ├── Footer/
│   │   ├── FormularioProducto/
│   │   ├── GestionProductos/
│   │   ├── Header/
│   │   ├── Item/
│   │   ├── ItemCount/
│   │   ├── ItemDetail/
│   │   ├── ItemDetailContainer/
│   │   ├── ItemList/
│   │   ├── ItemListContainer/
│   │   ├── Layout/
│   │   ├── Login/
│   │   ├── NavBar/
│   │   ├── Perfil/
│   │   ├── ProtectedRoute/
│   │   ├── Registro/
│   │   └── SEO/
│   ├── config/
│   │   └── firebase.js
│   ├── context/
│   │   ├── AuthContext.js
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.js
│   │   └── CartContext.jsx
│   ├── services/
│   │   ├── authService.js
│   │   └── productoService.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── firebase.json
├── firestore.rules
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

### Responsabilidades principales

- `componentes/`: componentes visuales y funcionalidades de la aplicación.
- `context/`: gestión global del carrito y autenticación.
- `config/`: configuración e inicialización de Firebase.
- `services/`: operaciones de autenticación y gestión de productos.
- `public/`: recursos estáticos e imágenes optimizadas.
- `scripts/`: herramientas auxiliares de optimización.
- `firestore.rules`: reglas de seguridad de Cloud Firestore.

El archivo `public/productos.json` se conserva como respaldo y referencia para la carga inicial de productos. La fuente principal de datos de la aplicación es Cloud Firestore.

---

## Base de datos

La aplicación utiliza Cloud Firestore como base de datos NoSQL.

### Colección: productos

Cada producto se almacena en un documento con identificador único generado por Firestore.

| Campo | Tipo | Descripción |
|---|---|---|
| nombre | string | Nombre del producto |
| descripcion | string | Descripción del producto |
| precio | number | Precio mayor que cero |
| stock | integer | Cantidad disponible, mayor o igual a cero |
| categoria | string | Categoría del producto |
| imagen | string | Ruta o URL de la imagen |

Ejemplo de documento:

```json
{
  "nombre": "Notebook Lenovo IdeaPad",
  "descripcion": "Notebook para estudio, trabajo y uso diario.",
  "precio": 899999,
  "stock": 8,
  "categoria": "notebooks",
  "imagen": "/imagenes/notebook-lenovo.webp"
}
```

### Colección: usuarios

Cada documento utiliza como identificador el UID generado por Firebase Authentication.

| Campo | Tipo | Descripción |
|---|---|---|
| nombre | string | Nombre del usuario |
| email | string | Correo electrónico |
| rol | string | cliente o admin |

Ejemplo de documento:

```json
{
  "nombre": "Cliente",
  "email": "cliente@example.com",
  "rol": "cliente"
}
```

---

## Seguridad

La aplicación implementa controles de acceso tanto en el frontend como en Cloud Firestore.

### Seguridad en el frontend

- Protección de rutas privadas.
- Verificación del estado de autenticación.
- Validación del rol del usuario.
- Restricción del panel administrativo.
- Validación de formularios.
- Manejo de errores y accesos no autorizados.

### Seguridad en Cloud Firestore

Las reglas se encuentran versionadas en el archivo `firestore.rules`.

- Lectura pública de productos.
- Creación, edición y eliminación de productos exclusivamente por administradores.
- Validación de los campos permitidos de cada producto.
- Validación de tipos de datos, precios y stock.
- Lectura del perfil limitada a su propietario.
- Creación de perfiles propios exclusivamente con rol cliente.
- Validación del correo electrónico contra el usuario autenticado.
- Prevención de modificaciones de roles desde la aplicación.
- Denegación de accesos no autorizados.
- Denegación por defecto de operaciones no contempladas.

La autorización no depende únicamente de la interfaz de usuario. Las reglas de Firestore también restringen las operaciones realizadas directamente mediante el SDK.

---

## Requisitos previos

Para ejecutar el proyecto se requiere:

- Node.js 22.17.1 o una versión compatible con las dependencias del proyecto.
- npm 10.9.2 o compatible.
- Git.
- Una cuenta de Firebase.
- Un proyecto Firebase con Authentication y Cloud Firestore habilitados.

El proyecto fue desarrollado y validado utilizando Node.js 22.17.1 y npm 10.9.2.

---

## Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/eliedytorrealba/tech-store.git
```

### 2. Ingresar al directorio

```bash
cd tech-store
```

### 3. Instalar las dependencias

```bash
npm ci
```

Se recomienda utilizar `npm ci` para instalar las versiones registradas en `package-lock.json`.

### 4. Configurar las variables de entorno

Crear un archivo `.env.local` en la raíz del proyecto utilizando `.env.example` como referencia.

En Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

En Linux o macOS:

```bash
cp .env.example .env.local
```

Completar las variables con los valores correspondientes al proyecto Firebase:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Estos valores se obtienen desde la configuración de la aplicación web en Firebase Console.

El archivo `.env.local` no debe incorporarse al repositorio.

Las variables con prefijo `VITE_` se incluyen en el código del cliente durante la compilación. No deben utilizarse para almacenar contraseñas, claves privadas ni credenciales de cuentas de servicio.

### 5. Configurar Firebase

Ingresar a:

https://console.firebase.google.com/

Realizar las siguientes configuraciones:

1. Crear un proyecto Firebase.
2. Registrar una aplicación web.
3. Obtener los valores de configuración de Firebase.
4. Habilitar Firebase Authentication.
5. Habilitar el proveedor de correo electrónico y contraseña.
6. Crear una base de datos Cloud Firestore.
7. Publicar las reglas incluidas en `firestore.rules`.
8. Crear la colección `productos`.
9. Incorporar los productos de referencia disponibles en `public/productos.json`.

Al cargar los productos en Firestore, utilizar identificadores automáticos y omitir el campo `id` del archivo JSON, ya que el identificador se obtiene directamente del documento.

La colección `usuarios` se genera al crear los perfiles correspondientes.

### 6. Configurar un usuario administrador

Para acceder al panel administrativo:

1. Crear un usuario desde Firebase Authentication.
2. Copiar el UID del usuario creado.
3. Crear un documento en la colección `usuarios`.
4. Utilizar el UID como identificador del documento.
5. Incorporar los campos `nombre`, `email` y `rol`.
6. Asignar el valor `admin` al campo `rol`.

Esta configuración debe realizarse desde Firebase Console o mediante un entorno administrativo autorizado.

Las credenciales de los usuarios administradores no se incluyen en el repositorio.

### 7. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abrir en el navegador:

http://localhost:5173/

En caso de que el puerto se encuentre ocupado, utilizar la dirección indicada por Vite.

---

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm ci` | Instala las dependencias según el archivo lock |
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera el build de producción |
| `npm run preview` | Ejecuta una vista previa del build |
| `npm run lint` | Ejecuta el análisis estático de código |
| `npm audit` | Audita las dependencias instaladas |

En Windows PowerShell, si la política de ejecución impide utilizar `npm`, se puede ejecutar `npm.cmd` como alternativa.

---

## Build de producción

Para generar la versión optimizada:

```bash
npm run build
```

Los archivos compilados se generan en el directorio `dist/`.

Para verificar el build localmente:

```bash
npm run preview
```

Abrir en el navegador:

http://localhost:4173/

Para un futuro despliegue, el servidor de alojamiento deberá estar configurado para redirigir las rutas de la SPA hacia `index.html`.

---

## Optimización y rendimiento

### Optimización de imágenes

Las imágenes originales fueron convertidas del formato PNG al formato WebP utilizando Sharp.

| Indicador | Resultado |
|---|---|
| Cantidad de imágenes | 6 |
| Tamaño original aproximado | 8,35 MB |
| Tamaño optimizado aproximado | 89,93 kB |
| Reducción aproximada | 98,92 % |
| Formato final | WebP |

También se implementó carga diferida de imágenes mediante el atributo `loading="lazy"`.

El script `scripts/optimizar-imagenes.mjs` se conserva como referencia del proceso de optimización. Para repetir la conversión se requieren las imágenes PNG originales, que no forman parte de la versión final del repositorio.

### Lazy Loading

Se implementó carga diferida de componentes mediante:

- React.lazy.
- Suspense.
- Importaciones dinámicas.
- Indicadores de carga durante la navegación.

Los componentes correspondientes al catálogo, detalle, carrito, autenticación, perfil y administración se cargan según la ruta solicitada.

### Code Splitting

Se configuró la separación de dependencias mediante Vite y Rolldown.

| Chunk | Tamaño | Gzip |
|---|---:|---:|
| index | 15,86 kB | 5,55 kB |
| react-vendor | 257,07 kB | 81,53 kB |
| firebase-vendor | 336,62 kB | 103,49 kB |
| ui-vendor | 89,32 kB | 29,29 kB |
| rolldown-runtime | 0,59 kB | 0,36 kB |

### Comparativa de optimización

| Indicador | Antes | Después |
|---|---:|---:|
| Chunk principal | 697,29 kB | 15,86 kB |
| Chunk principal gzip | 217,97 kB | 5,55 kB |
| Mayor chunk JavaScript | 697,29 kB | 336,62 kB |
| Advertencias por tamaño de chunks | 1 | 0 |

La separación permitió reducir el tamaño del chunk principal aproximadamente un 97,73 % y eliminar las advertencias de tamaño de Vite.

Esta reducción corresponde al chunk principal y no representa una reducción equivalente del peso total de JavaScript, dado que las dependencias se distribuyen en archivos independientes.

---

## Accesibilidad y SEO

Se implementaron mejoras orientadas a la accesibilidad y experiencia de usuario:

- Estructura semántica HTML.
- Textos alternativos en imágenes.
- Etiquetas accesibles.
- Navegación mediante teclado.
- Indicadores visibles de foco.
- Estados de carga y mensajes de error accesibles.
- Diseño responsive.
- Respeto por las preferencias de movimiento reducido.

La gestión de SEO se realiza mediante React Helmet Async:

- Títulos dinámicos según la página.
- Metadescripciones dinámicas.
- Metadatos Open Graph.
- Configuración de indexación según la ruta.
- Exclusión de indexación en páginas privadas.
- Títulos y descripciones específicos para cada producto.

---

## Auditorías Lighthouse

Se realizaron cuatro auditorías sobre el build de producción local utilizando Google Chrome y Lighthouse.

Fecha de ejecución: 27/11/2026.

| Página | Dispositivo | Performance | Accessibility | Best Practices | SEO |
|---|---|---:|---:|---:|---:|
| Inicio | Desktop | 100 | 100 | 100 | 91 |
| Inicio | Mobile | 84 | 100 | 100 | 91 |
| Catálogo | Desktop | 99 | 100 | 100 | 92 |
| Catálogo | Mobile | 90 | 100 | 100 | 91 |
| Promedio | | 93,25 | 100 | 100 | 91,25 |

### Promedio general

**96,13 / 100**

Las cuatro auditorías se completaron correctamente.

Los resultados corresponden al entorno de producción local y pueden variar según el dispositivo, la conexión, el navegador y el entorno de despliegue.

Las puntuaciones de accesibilidad representan las comprobaciones automatizadas realizadas por Lighthouse y no garantizan por sí solas el cumplimiento integral de los estándares de accesibilidad.

---

## Pruebas y aseguramiento de calidad

Durante el desarrollo se realizaron pruebas funcionales, de integración, seguridad, regresión, accesibilidad y rendimiento.

### Resultados de bloques de QA

| Módulo | Pruebas aprobadas |
|---|---:|
| Autenticación y autorización | 33/33 |
| CRUD de productos | 59/59 |
| Seguridad de Firestore | 12/12 |
| Búsqueda en tiempo real | 10/10 |
| Paginación | 7/7 |
| Regresión del catálogo | 6/6 |
| Regresión de optimización y accesibilidad | 9/9 |

Los resultados corresponden a escenarios de prueba manuales y verificaciones directas de integración. Algunos escenarios de seguridad también fueron cubiertos durante las pruebas funcionales.

### Validaciones adicionales

- Navegación entre rutas.
- Visualización del catálogo.
- Detalle de productos.
- Gestión y persistencia del carrito.
- Validación de stock.
- Registro e inicio de sesión.
- Persistencia de autenticación.
- Restricción de rutas privadas.
- Validación de permisos mediante el SDK de Firebase.
- Creación, edición y eliminación de productos.
- Confirmación de eliminación.
- Notificaciones.
- Metadatos dinámicos.
- Carga diferida de componentes.
- Diseño responsive.
- Navegación mediante teclado.
- Validación del build de producción.

### Validaciones técnicas

| Validación | Resultado |
|---|---|
| ESLint | PASS |
| Build de producción | PASS |
| npm audit | 0 vulnerabilidades detectadas |
| Git diff check | PASS |
| Auditorías Lighthouse | 4/4 completadas |
| Advertencias de tamaño de chunks | 0 |

---

## Limitaciones y oportunidades de mejora

Tech Store es un proyecto académico que simula el funcionamiento de una tienda de comercio electrónico.

Las siguientes funcionalidades se encuentran fuera del alcance de esta entrega:

- Integración con pasarelas de pago reales.
- Generación y almacenamiento de órdenes de compra.
- Descuento transaccional de stock al finalizar una compra.
- Gestión de envíos.
- Historial de compras.
- Recuperación de contraseña.
- Administración de usuarios desde el panel.
- Sincronización del carrito entre dispositivos.
- Revalidación transaccional de precios y stock al finalizar una compra.
- Paginación y búsqueda directamente desde el servidor para catálogos de gran volumen.
- Renderizado del lado del servidor para mejorar la indexación.
- Automatización integral de las pruebas.
- Mejoras adicionales de rendimiento en dispositivos móviles.
- Revisión de las comprobaciones SEO pendientes de Lighthouse.

La compra es simulada y no genera cargos económicos ni modifica automáticamente el inventario.

El carrito se almacena localmente en el navegador y puede conservar datos de productos anteriores a una actualización del catálogo.

---

## Repositorio

https://github.com/eliedytorrealba/tech-store

---

## Autoría

**Eliedy Torrealba**

Proyecto individual desarrollado como entrega final del curso de React JS.

Noviembre de 2026.
