# Project Structure and Template

This project is following a modular architecture pattern using **NestJS** and **GraphQL** for building scalable and maintainable applications. The folder structure is designed to separate concerns, enhance reusability, and support easy scaling of the application as new features and modules are added.

## Folder Structure

```
src/
├── common/                   # Reusable utilities, decorators, pipes, filters, etc.
│   ├── dto/                  # Data Transfer Objects (DTO) for API communication
│   ├── exceptions/           # Custom exceptions and error handling
│   ├── filters/              # Global or module-specific filters
│   ├── guards/               # Authorization and custom guards
│   └── pipes/                # Input validation and transformation
├── modules/                  # Feature modules for each domain of the app
│   ├── auth/                 # Authentication and authorization logic
│   │   ├── auth.module.ts    # Auth module setup
│   │   ├── auth.service.ts   # Auth logic
│   │   ├── auth.resolver.ts  # GraphQL resolver for authentication
│   │   ├── dto/              # Auth-specific DTOs (e.g., LoginDTO, RegisterDTO)
│   │   └── entities/         # Auth-related entities (e.g., User, Role)
│   ├── business/             # Business logic module
│   │   ├── business.module.ts
│   │   ├── business.service.ts
│   │   ├── business.resolver.ts
│   │   ├── dto/              # Business-related DTOs (e.g., CreateBusinessDTO)
│   │   └── entities/         # Business-related entities (e.g., Business)
│   ├── user/                 # User management module
│   │   ├── user.module.ts
│   │   ├── user.service.ts
│   │   ├── user.resolver.ts
│   │   ├── dto/              # User-related DTOs (e.g., CreateUserDTO)
│   │   └── entities/         # User-related entities
├── database/                 # Database and ORM configurations
│   ├── entities/             # Shared entities (e.g., User, Business)
│   ├── migrations/           # Database migration files
│   ├── typeorm.config.ts     # TypeORM configuration (DB connection)
├── graphql/                  # GraphQL-specific configurations
│   ├── schema/               # GraphQL schema, resolvers, and configuration
│   └── resolvers/            # GraphQL resolvers
├── app.module.ts             # Root module that imports all feature modules
└── main.ts                   # Entry point of the application
```

## Folder Description

### `common/`
Contains reusable utilities and abstractions to handle various tasks globally across the application. This includes:
- **DTOs**: Data Transfer Object classes for validation, transformation, and reusability.
- **Exceptions**: Custom exceptions and error handling strategies.
- **Filters**: Global filters such as HTTPException handling.
- **Guards**: Guards for authorization and other custom security measures.
- **Pipes**: Input validation and transformation logic for request data.

### `modules/`
Feature-based modules that encapsulate domain-specific logic. Each module contains:
- **Module**: Setup and configuration of the module.
- **Service**: Business logic related to the module.
- **Resolver**: GraphQL resolvers for querying and mutating data.
- **DTOs**: Data Transfer Object classes specific to the module.
- **Entities**: Entities representing database tables for the module.

### `graphql/`
Contains GraphQL-specific configurations:
- **Schema**: The GraphQL schema, including resolvers, queries, and mutations.
- **Resolvers**: Handle the GraphQL queries and mutations for each domain (e.g., Business, User).

### `database/`
Database and ORM (TypeORM) configurations:
- **Entities**: Database entities representing the structure of tables.
- **Migrations**: Files for handling database migrations.
- **TypeORM Config**: Configuration for the database connection.

### `app.module.ts`
The root module that imports all feature modules and sets up the application.

### `main.ts`
The entry point for the application where the NestJS app is bootstrapped.

## Project Setup

### Install Dependencies
Make sure to install all required dependencies before running the project.

```
npm install
```

### Start the Application
To run the project in development mode:

```
npm run start:dev
```

This will start the NestJS server, and the application will be accessible at `http://localhost:3000`.

### Migrate Database
To apply any migrations to the database:

```
npm run migration:run
```

### Testing
For unit and integration testing, run:

```
npm run test
```