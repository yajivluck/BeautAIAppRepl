# **GraphQL API for Businesses SQL Schema**

## **Features**

- Create, read, update, and delete (CRUD) operations for `Businesses` entities.
- GraphQL schema for interacting with the API.
- Integrated with MySQL as the database.
- Validation using `class-validator`.

---

## **Table of Contents**

- [Database Schema](#database-schema)
- [API Usage](#api-usage)
  - [Queries](#queries)
  - [Mutations](#mutations)
- [Examples](#examples)

---

## **Database Schema**

The API uses the following SQL schema for the `Business` table:

```sql
CREATE TABLE businesses (
    provider_id INT AUTO_INCREMENT PRIMARY KEY,
    provider_name VARCHAR(255) NOT NULL,
    rating DECIMAL(3, 2) DEFAULT NULL,
    total_reviews INT DEFAULT NULL,
    opening_time TIME DEFAULT NULL,
    closing_time TIME DEFAULT NULL,
    address VARCHAR(255) DEFAULT NULL,
    city VARCHAR(100) DEFAULT NULL,
    country VARCHAR(100) DEFAULT NULL,
    distance_km DECIMAL(5, 2) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## **API Usage**

### **Queries**

1. **Get all businesses**:

   ```graphql
   query {
     businesses {
       provider_id
       provider_name
       rating
       total_reviews
     }
   }
   ```

2. **Get a single business by ID**:
   ```graphql
   query {
     business(provider_id: 1) {
       provider_name
       rating
       address
       city
     }
   }
   ```

### **Mutations**

1. **Create a new business**:

   ```graphql
   mutation {
     createBusiness(
       createBusinessInput: {
         provider_name: "Beauty Salon"
         rating: 4.8
         total_reviews: 512
         opening_time: "09:00:00"
         closing_time: "18:00:00"
         address: "123 Beauty St."
         city: "Metropolis"
         country: "Wonderland"
         distance_km: 15.5
       }
     ) {
       provider_id
       provider_name
     }
   }
   ```

2. **Update a business**:

   ```graphql
   mutation {
     updateBusiness(
       updateBusinessInput: {
         provider_id: 1
         provider_name: "Luxury Beauty Salon"
         rating: 4.9
         total_reviews: 520
         opening_time: "08:30:00"
         closing_time: "19:00:00"
         address: "456 Luxury Lane"
         city: "Metropolis"
         country: "Wonderland"
         distance_km: 10.0
       }
     ) {
       provider_id
       provider_name
       rating
       total_reviews
       city
       created_at
       updated_at
     }
   }
   ```

3. **Delete a business**:
   ```graphql
   mutation {
     deleteBusiness(provider_id: 1) {
       provider_id
     }
   }
   ```

---

## **Examples**

1. **Environment Variables**:

   - Configure your database connection in `.env`:
     ```env
     # MySQL Database Configuration
     DB_HOST=localhost
     DB_PORT=3306
     DB_USERNAME=root
     DB_PASSWORD=your_password
     DB_DATABASE=your_database_name

     # Other Configurations (optional)
     GRAPHQL_SCHEMA_PATH=src/schema.gql
     ```

2. **Starting the Development Server**:

   ```bash
   npm run start:dev
   ```

3. **Accessing GraphQL Playground**:
   - Navigate to `http://localhost:3000/graphql`.
