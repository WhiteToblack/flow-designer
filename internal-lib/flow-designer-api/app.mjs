import express, { json } from "express";
import MongoDbIntegrator from "./database-connector/MongoDbIntegrator.mjs";

const app = express();
app.use(json());

const port = process.env.PORT || 3000;

app.listen(port, () => { 
  console.log("Server Listening on PORT:", port);
  new MongoDbIntegrator(app);
});
