import fs from "fs-extra";
import path from "path";
import { graphql } from "graphql";
import { getIntrospectionQuery, printSchema } from "graphql/utilities";

import Schema from "../graphql";

async function buildSchema() {
  await fs.ensureFile("../data/schema.graphql.json");
  await fs.ensureFile("../data/schema.graphql");

  const introspectionQuery = getIntrospectionQuery();

  fs.writeFileSync(
    path.join(__dirname, "../data/schema.graphql.json"),
    JSON.stringify(
      await graphql({ schema: Schema, source: introspectionQuery }),
      null,
      2
    )
  );

  fs.writeFileSync(
    path.join(__dirname, "../data/schema.graphql.txt"),
    printSchema(Schema)
  );
}

async function run() {
  await buildSchema();
  console.log("Schema build complete!");
}

run().catch((e) => {
  console.log(e);
  process.exit(0);
});
