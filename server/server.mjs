import express from "express"; // Import Express for handling routing and middleware.
import http from "http"; // Import Node's built-in HTTP module to create a server.
import { ApolloServer } from "@apollo/server"; // Import Apollo Server to handle GraphQL requests.
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"; // Import a plugin to gracefully shut down the HTTP server.
import bodyParser from "body-parser"; // Import body-parser middleware to parse incoming request bodies (like JSON).
import { expressMiddleware } from "@apollo/server/express4"; // Import middleware for integrating Apollo Server with Express.
import cors from "cors";
import fakerData from "./fakerData/index.js";

const app = express(); // Create an Express application.
const httpServer = http.createServer(app); // Create an HTTP server that listens for requests and uses your Express app to respond.

// Define the GraphQL schema (type definitions) - this would normally include your GraphQL types. Documents
const typeDefs = `#graphql
type Folder {
  id: String,
  name: String,
  createAt: String,
  author: Author
}

type Author {
  id: String,
  name: String
}

type Query {
  folders: [Folder]
}

`;

const resolvers = {
  Query: {
    folders: () => {
      return fakerData.folders;
    },
  },
  Folder: {
    author: (parent, args) => {
      const authorId = parent.authorId;
      return fakerData.authors.find((author) => author.id === authorId);
    },
  },
}; // Xử lý giữ liệu, và trả về giữ liệu cho phía client dựa théo những query phía client gửi tới

const server = new ApolloServer({
  typeDefs, // Pass in your type definitions for the GraphQL schema.
  resolvers, // Pass in your resolvers for handling GraphQL requests.
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })], // Add the plugin to handle graceful shutdown of the HTTP server.
});

await server.start(); // Start the Apollo Server. It needs to be initialized before handling requests.

app.use(cors(), bodyParser.json(), expressMiddleware(server));
// Add middleware to the Express app:
// 1. `cors()`: Enables Cross-Origin Resource Sharing to allow requests from different origins.
// 2. `bodyParser.json()`: Parses incoming requests with JSON bodies and makes it accessible via `req.body`.
// 3. `expressMiddleware(server)`: Integrates Apollo Server with Express to handle GraphQL requests through Express.

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
// Start the HTTP server, making it listen for requests on port 4000.
// `new Promise` ensures the server starts and only resolves when it is ready.

console.log("Server ready at http://localhost:4000");
// Log to the console that the server is running and ready to handle requests at localhost:4000.
