# Running the App with Docker Compose

## Prerequisites

Make sure you have Docker and Docker Compose installed on your system.

## Steps to Run the App

1. **Clone the Repository**:

2. **Start the Docker Compose Services**:

   ```bash
   docker-compose up -d
   ```

3. **Access the App**:
   Once the services are up and running, you can access the app through your web browser or API client.
   - The Express app will be running on port `4000` on your localhost. You can access it at `http://localhost:4000`.

## API Endpoints

### User Authentication

#### Sign Up

- **Method**: POST
- **URL**: {{baseUrl}}/auth/signup
- **Content-Type**: Application/json
- **Response**:

  ```json
  {
      "message": "success"
  }
  ```

- **Body**:

  ```json
  {
    "Email": "asismelgarejo@gmail.com",
    "Password": "123456",
    "FirstName": "Asis",
    "LastName": "Melgarejo"
  }
  ```

#### Sign In

- **Method**: POST
- **URL**: {{baseUrl}}/auth/sign-in
- **Content-Type**: Application/json
- **Response**:

  ```json
  {
      "data": {
          "accessToken": "eyJhoxNzA3MjYyNTMzfQ.LpZRY_DZnMfOLRBeG3XF5KQ9OGl_DuL9VqPjcZRp_9M",
          "refreshToken": "eyJhbGfQ.kVRhfzEZwgt1JVZDJHFWuzUA7kvkpvaNtRoivPvEoIs"
      }
  }
  ```

- **Body**:

  ```json
  {
    "Email": "asismelgarejo@gmail.com",
    "Password": "123456"
  }
  ```

#### Refresh Token

- **Method**: POST
- **URL**: {{baseUrl}}/auth/refresh-token
- **Content-Type**: Application/json
- **Body**:

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYXNpc21lbGdhcmVqb0BnbWFpbC5jb20iLCJpYXQiOjE3MDcyMzM3NjF9.2JmD8RUMCx5BXenu6VwKYbenAWTrbVTREqcmJ0rPDDA"
  }
  ```

### Exchanges

#### Get All Exchanges

- **Method**: GET
- **URL**: {{baseUrl}}/exchanges
- **Authentication**: Bearer Token required

#### Get Exchange by ID

- **Method**: GET
- **URL**: {{baseUrl}}/exchanges/:ID
- **ID Example**: 65c2b6589487e8f1e89ba851
- **Authentication**: Bearer Token required

#### Delete Exchange by ID

- **Method**: DELETE
- **URL**: {{baseUrl}}/exchanges/:ID
- **ID Example**: 65c2b6589487e8f1e89ba851
- **Authentication**: Bearer Token required

#### Create Exchange

- **Method**: POST
- **URL**: {{baseUrl}}/exchanges
- **Content-Type**: Application/json
- **Authentication**: Bearer Token required
- **Body**:

  ```json
  {
    "tipo_de_cambio": "venta",
    "monto_enviar": 15
  }
  ```

## Additional Notes

- The MongoDB service is exposed on port `27017`.
- The Exchange service is configured to run with `NODE_ENV` set to `prod`. You can modify the environment variables in the `docker-compose.yml` file if needed.
