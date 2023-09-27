export default class DbCallbackMethods {
  ctx = null;
  db = null;

  constructor(_ctx) {
    this.ctx = _ctx;
    this.db = _ctx?.db;
  }

  findByCollection = async (collectionName) => {
    const ruleTbl = await this.db.collection("Rule");
    const query = { CollectionName: collectionName };
    const options = {
      // Sort matched documents in descending order by rating
      sort: { Name: -1 },

      projection: {
        _id: 0,
        Id: 1,
        SymbolType: 1,
        Source: 1,
        Destination: 1,
        CollectionName: 1,
        PositionX: 1,
        PositionY: 1,
        ScritData: 1,
      },
    };

    const nodes = await ruleTbl.find(query, options);

    let response = [];
    for await (const doc of nodes) {
      console.dir(doc);
      response.push(doc);
    }
    return response;
  };

  saveCollection = async (params) => {
    const ruleTbl = await this.db.collection("Rule");
    const options = { ordered: true };
    const result = await ruleTbl.insertMany(params, options);
    console.log(`${result.insertedCount} documents were inserted`);
    return result;
  };
}
