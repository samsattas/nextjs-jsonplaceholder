# JSONPlaceholder App

Esta aplicación web está construida con Next.js 14, React 18 y TypeScript, y consume datos de la API JSONPlaceholder para mostrar usuarios, publicaciones y comentarios de manera coherente y mostrando la relación entre cada uno.

## Características

### Usuarios

- Listado de usuarios
- Filtrado de usuarios por nombre y username
- Detalle de un usuario en específico
- Botón para volver a la lista de usuarios

### Publicaciones

- Listado de publicaciones
- Filtrado de publicaciones por título y texto
- Ordenamiento de publicaciones por título
- Detalle de una publicación en especifico
- Botón para volver al listado de publicaciones
- Paginación de publicaciones

### Comentarios

- Listado de comentarios de una publicación
- Simulación de agregar un comentario (extra)

### Desarrollo

- Diseño responsive con Tailwind CSS
- Uso de componentes de ShadCN
- Server Components de Next.js 14

## Requisitos Previos

- Node.js 18.0.0 o superior
- npm o yarn

## Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/
cd nextjs-jsonplaceholder
```

2. Instala las dependencias:

```bash
npm install
# o
yarn install
```

3. Ejecuta el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Decisiones Arquitectónicas

### Server Components vs. Client Components

- **Server Components**: Utilizo Server Components para la obtención inicial de datos, lo que ofrece varias ventajas:

  - Reducción del JavaScript en el cliente
  - Mejora en el tiempo de carga inicial
  - Mejor indexación para SEO
  - Seguridad al mantener lógica sensible en el servidor

- **Client Components**: Los utilizo para funcionalidades interactivas como:
  - Filtrado dinámico de usuarios y publicaciones
  - Formulario de comentarios
  - Paginación
  - Ordenamiento de publicaciones

### Estructura de Carpetas

- **app/**: Siguiendo la estructura del App Router de Next.js 14
  - **users/ y posts/**: Rutas principales para usuarios y posts
  - **posts/:id/comments/**: Ruta secundaria para comentarios
  - **components/**: Componentes para usar en el desarrollo de la aplicación
  - **lib/**: Configuración de tipos y de API para traer la información

### Manejo del Estado

Como decidí no utilizar TanStack Query por falta de familiaridad, implementé un enfoque alternativo:

1. Obtención inicial de datos con Server Components
2. Manejo del estado local con `useState` para filtros, ordenamiento, paginación, etc.
3. Simulación de la creación de comentarios con estado local

### Estilos

Utilicé Tailwind CSS por su flexibilidad y agilidad para configurar los estilos de cada pagina y componente.

## Performance y Buenas Prácticas

### Optimizaciones implementadas:

1. **Server Components**: Reducción de JavaScript en el cliente
2. **Paginación**: Para reducir la cantidad de elementos renderizados en una sola pantalla
3. **Estructura de componentes**: Separación de lógica para evitar renderizados o fetch innecesarios
4. **Manejo de errores**: Implementación de manejo de errores para evitar cualquier colapso y dar claridad a cualquier problema que pueda estar pasando

## Sobre la Omisión de TanStack Query

Decidí no utilizar TanStack Query en este proyecto porque no tengo experiencia previa con esta biblioteca. Sin embargo, comprendo sus beneficios:

- Gestión automática de caché
- Revalidación de datos
- Manejo del estado de carga/error
- Memoización para evitar refetching innecesario

En un entorno real, con tiempo para familiarizarme con la herramienta, sería una adición valiosa al proyecto.

## Cuestionario Teórico

A continuación estan las respuestas del cuestionario:

1. Verdadero
2. Falso
3. Falso
4. Verdadero
5. Falso
6. B
7. B
8. B
9. B
10. A
