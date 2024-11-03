import express from "express"; // Import Express for handling routing and middleware.
import http from "http"; // Import Node's built-in HTTP module to create a server.
import { ApolloServer } from "@apollo/server"; // Import Apollo Server to handle GraphQL requests.
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"; // Import a plugin to gracefully shut down the HTTP server.
import bodyParser from "body-parser"; // Import body-parser middleware to parse incoming request bodies (like JSON).
import { expressMiddleware } from "@apollo/server/express4"; // Import middleware for integrating Apollo Server with Express.
import cors from "cors";
import { resolvers } from "./resolvers/index.js";
import { typeDefs } from "./schemas/index.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import "./firebaseConfig.js";
import { getAuth } from "firebase-admin/auth";

dotenv.config();
const app = express(); // Create an Express application.
const httpServer = http.createServer(app); // Create an HTTP server that listens for requests and uses your Express app to respond.

// Define the GraphQL schema (type definitions) - this would normally include your GraphQL types. Documents

// Xử lý giữ liệu, và trả về giữ liệu cho phía client dựa théo những query phía client gửi tới

//CONNECT TO DATABASE
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@note-app-tamn.fflum.mongodb.net/?retryWrites=true&w=majority&appName=note-app-tamn`;
//const URI = `mongodb+srv://hoangtam:123@note-app-tamn.fflum.mongodb.net/?retryWrites=true&w=majority&appName=note-app-tamn`;
const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs, // Pass in your type definitions for the GraphQL schema.
  resolvers, // Pass in your resolvers for handling GraphQL requests.
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })], // Add the plugin to handle graceful shutdown of the HTTP server.
});

await server.start(); // Start the Apollo Server. It needs to be initialized before handling requests.
const authorizationJWT = async (req, res, next) => {
  console.log({ authorization: req.headers.authorization });
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader) {
    const accessToken = authorizationHeader.split(" ")[1];
    getAuth()
      .verifyIdToken(accessToken)
      .then((decodedToken) => {
        console.log({ decodedToken });
        res.locals.uid = decodedToken.uid;
        next();
      })
      .catch((err) => {
        console.log({ err });
        return res.status(403).json({ message: "Forbidden", error: err });
      });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

app.use(
  cors(),
  authorizationJWT,
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      return { uid: res.locals.uid };
    },
  })
);
// Add middleware to the Express app:
// 1. `cors()`: Enables Cross-Origin Resource Sharing to allow requests from different origins.
// 2. `bodyParser.json()`: Parses incoming requests with JSON bodies and makes it accessible via `req.body`.
// 3. `expressMiddleware(server)`: Integrates Apollo Server with Express to handle GraphQL requests through Express.

mongoose.connect(URI).then(async () => {
  console.log("Connected to DataBase ");
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  // Start the HTTP server, making it listen for requests on port 4000.
  // `new Promise` ensures the server starts and only resolves when it is ready.

  console.log("Server ready at http://localhost:4000");
  // Log to the console that the server is running and ready to handle requests at localhost:4000.
});
