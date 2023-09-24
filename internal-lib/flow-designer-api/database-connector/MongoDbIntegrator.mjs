import { MongoClient, ServerApiVersion } from "mongodb";
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
      this.db = this.client.db("FlowDesigner");
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
    this.app.get("/status", (request, response) => this.getStatus(response));
    this.app.get("/find", async (request, response) =>
      this.findByCollection.call(this, request, response)
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
      await this.client.close();
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
}
