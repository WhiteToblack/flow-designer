const express = require("express");

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://whitetoblack:A8MufkGm@wtbcluster.ux9osq9.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
var db = null;
async function runTest() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    db = client.db("FlowDesigner");
    // Send a ping to confirm a successful connection
    await db.command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

app.listen(port, () => {
  runTest().catch(console.dir);
  console.log("Server Listening on PORT:", port);
});

app.get("/status", (request, response) => {
  const status = {
    Status: "Running",
  };

  response.send(status);
});

app.get("/find", async (request, response) => {
  try {
    await client.connect();
    const ruleTbl = await db.collection("Rule");
    const query = { Collection: request.query.Collection };
    const options = {
      // Sort matched documents in descending order by rating
      sort: { Name: -1 },

      // Include only the `title` and `imdb` fields in the returned document
      projection: { _id: 0, Name: 1, Index: 1 },
    };
    const rule = await ruleTbl.findOne(query, options);
    response.send(rule);
  } catch (error) {
    response.send({ Error: error });
  } finally {
    await client.close();
  }
});
