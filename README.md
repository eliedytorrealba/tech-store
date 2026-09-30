# Tech Store

Proyecto de e-commerce desarrollado con React JS como parte de la pre-entrega del curso.

Tech Store es una tienda de tecnología que permite visualizar un catálogo de productos, acceder al detalle de cada producto y agregar productos a un carrito de compras.

## Funcionalidades

- Catálogo de productos.
- Carga de productos desde un archivo JSON local utilizando `fetch` y `useEffect`.
- Componentes reutilizables para mostrar los productos.
- Vista de detalle de cada producto.
- Selector de cantidad según el stock disponible.
- Carrito de compras utilizando Context API.
- Contador de productos en el carrito actualizado en tiempo real.
- Eliminación de productos del carrito.
- Opción para vaciar completamente el carrito.
- Cálculo del total de la compra.
- Navegación mediante React Router DOM.
- Diseño responsive para diferentes tamaños de pantalla.

## Rutas

La aplicación cuenta con las siguientes rutas:

- `/` - Página de inicio.
- `/productos` - Catálogo de productos.
- `/producto/:id` - Detalle de un producto.
- `/carrito` - Carrito de compras.

## Tecnologías utilizadas

- React JS
- Vite
- React Router DOM
- Context API
- JavaScript
- HTML
- CSS

## Instalación

Para ejecutar el proyecto localmente:

1. Clonar el repositorio:

```bash
git clone https://github.com/eliedytorrealba/tech-store.git
```

2. Ingresar a la carpeta del proyecto:

```bash
cd tech-store
```

3. Instalar las dependencias:

```bash
npm install
```

4. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

5. Abrir en el navegador la dirección indicada por Vite en la terminal.

## Autor

**Eliedy Torrealba**

Proyecto realizado para el curso de React JS.