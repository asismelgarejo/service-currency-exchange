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

## Additional Notes

- The MongoDB service is exposed on port `27017`.
- The Exchange service is configured to run with `NODE_ENV` set to `prod`. You can modify the environment variables in the `docker-compose.yml` file if needed.
