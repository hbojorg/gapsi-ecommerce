# Gapsi e-Commerce - Mantenimiento de Proveedores

Aplicación fullstack para el mantenimiento de proveedores de la tienda online Gapsi.

## Tech Stack

- **Backend:** Java 17, Spring Boot 3.3, Spring Data JPA, H2, Spring for GraphQL, springdoc-openapi
- **Frontend:** React 19, TypeScript, Vite 7, Redux Toolkit, Apollo Client, Material-UI 6, react-virtuoso
- **Testing:** JUnit 5 + Mockito (backend), Vitest + React Testing Library (frontend)

## Requisitos

- Java 17+
- Maven 3.9+
- Node.js 18+
- npm 9+

## Levantar el proyecto

### Backend

```bash
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

El servidor inicia en **http://localhost:8080**

### Frontend

```bash
cd frontend
npm install
npm run dev
```

La aplicación inicia en **http://localhost:5173**

## URLs de desarrollo

| Servicio | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8080/api |
| Swagger UI | http://localhost:8080/swagger-ui.html |
| GraphiQL | http://localhost:8080/graphiql |
| H2 Console | http://localhost:8080/h2-console |

## Tests

```bash
# Backend 
cd backend && mvn test

# Frontend
cd frontend && npm test
```

## API Endpoints

### REST

- `GET /api/proveedores?page=0&size=10` - Lista paginada
- `POST /api/proveedores` - Crear proveedor
- `DELETE /api/proveedores/{id}` - Eliminar proveedor
- `GET /api/welcome` - Información de bienvenida

### GraphQL

Endpoint: `POST /graphql`

```graphql
query { proveedores(page: 0, size: 10) { content { id nombre razonSocial direccion } totalElements totalPages } }
mutation { crearProveedor(input: { nombre: "...", razonSocial: "...", direccion: "..." }) { id nombre } }
mutation { eliminarProveedor(id: 1) }
```

## Arquitectura

- **Backend:** Hexagonal / Clean Architecture (Domain → Application → Infrastructure)
- **Frontend:** Component-based con Redux Toolkit para state management

## Patrones de diseño documentados

1. **Repository Pattern** - `ProveedorRepositoryPort` + `ProveedorPersistenceAdapter`
2. **DTO / Adapter Pattern** - `ProveedorRequestDTO`, `ProveedorResponseDTO`
3. **Builder Pattern** - `Proveedor.Builder`
