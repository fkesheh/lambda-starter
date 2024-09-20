# Lambda Starter Project

This project provides a starter template for building AWS Lambda functions with Node.js. It includes a router, a local development setup, and a PostgreSQL utility and bearer token authentication.

## Project Structure

- `index.mjs`: Main entry point for the Lambda function
- `router.mjs`: Handles routing for different API endpoints
- `local.mjs`: Provides local development setup
- `utils/pg.mjs`: Utility for PostgreSQL database operations
- `api/`: Contains API endpoint handlers
  - `health-check/get.mjs`: Handles GET requests for health checks
  - `ping/get.mjs`: Ping pong handler
  - `data/post.mjs`: Example of how to handles POST requests for data
  - `get.mjs`: Example of how to handles GET requests
- To create a new endpoint, create a directory in the `api/` folder and add your handler file with the appropriate method (get, post, put, delete)


## Getting Started

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your environment variables (copy .env.example to .env and fill in the values)
4. Run locally:
   ```
   npm run dev
   ```

## Deployment

Deploy to AWS Lambda using your preferred method (e.g., AWS CLI, Serverless Framework, or AWS Console).

## License

See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
