export default class DbCallbackMethods {
  ctx = null;
  db = null;

  constructor(_ctx) {
    this.ctx = _ctx;
    this.db = _ctx?.db;
  }

  findByCollection = async (collectionName) => {
    const ruleTbl = await this.db.collection("Rule");
    const query = { Collection: collectionName };
    const options = {
      // Sort matched documents in descending order by rating
      sort: { Name: -1 },

      // Include only the `title` and `imdb` fields in the returned document
      projection: { _id: 0, Name: 1, Index: 1 },
    };
    const rule = await ruleTbl.findOne(query, options);
    return rule;
  };
}
