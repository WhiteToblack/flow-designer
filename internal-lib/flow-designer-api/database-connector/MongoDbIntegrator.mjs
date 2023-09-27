import { MongoClient, ServerApiVersion } from "mongodb";
import cors from "cors";
import DbCallbackMethods from "./mongoDbMethods.mjs";
export default class MongoDbIntegrator {
  db = null;
  app = null;
  client = null;
  callbackMethods = null;

  constructor(_app) {
    this.app = _app;
    const uri =
      "mongodb+srv://whitetoblack:A8MufkGm@wtbcluster.ux9osq9.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    this.client = client;
    this.startConnection();
  }

  startConnection = async () => {
    try {
      await this.client.connect();
      this.db = this.client.db("WTB");
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 });

      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );

      this.Initialize();
    } finally {
      // Ensures that the client will close when you finish/error
      await this.client.close();
    }
  };

  Initialize = () => {
    var corsOptions = {
      origin: "http://localhost:5173",
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    };

    this.app.get("/status", cors(corsOptions), (request, response) =>
      this.getStatus(response)
    );
    this.app.get("/find", cors(corsOptions), async (request, response) =>
      this.findByCollection.call(this, request, response)
    );
    this.app.post(
      "/saveCollection",
      cors(corsOptions),
      async (request, response) =>
        this.saveCollection.call(this, request, response)
    );

    this.callbackMethods = new DbCallbackMethods(this);
  };

  sendCommand = async (callbackFunc) => {
    try {
      await this.client.connect();
      return callbackFunc();
    } catch (error) {
      console.log(error);
    } finally {
      if (this != null && this.client != null && this.client.close) {
        await this.client.close();
      }
    }
  };

  getStatus = (response) => {
    const status = {
      Status: "Running",
    };

    response.send(status);
  };

  findByCollection = async (request, response) => {
    var result = await this.sendCommand(
      this.callbackMethods.findByCollection.bind(this, request.query.Collection)
    );
    response.send(result);
  };

  saveCollection = async (request, response) => {
    var result = await this.sendCommand(
      this.callbackMethods.saveCollection.bind(this, request.body)
    );
    response.send(result);
  };
}
