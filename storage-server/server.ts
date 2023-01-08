import express from "express";
import { ApolloServer } from "apollo-server-express";
import initMongoose from "./src/mongoose";
import * as dotenv from "dotenv";
import schema from "./src/graphql";
import cors from "cors";
import auth from "./src/middleware/auth";

async function main() {
  const app = express();

  const serverConfig = {
    production: { ssl: true, port: 443, hostname: "" },
    development: { ssl: false, port: 8000, hostname: "localhost" },
  };
  app.use(auth);

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: ["https://studio.apollographql.com", "localhost"],
    })
  );
  dotenv.config();

  await initMongoose();

  const server = new ApolloServer({
    schema,
    introspection: true,
  });

  // await server.start();
  const environment = (process.env.NODE_ENV ||
    "development") as keyof typeof serverConfig;

  await server.start();
  server.applyMiddleware({
    app,
  });

  // CHE

  app.listen(process.env.PORT || 8000, () => {
    console.log(
      `Server ready at http://localhost:${process.env.PORT || 8000}/graphql`
    );
  });
}

main();
