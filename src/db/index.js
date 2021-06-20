const dbUri =
  "mongodb+srv://kunalkmk:kunal12345@cluster0-v9tid.mongodb.net/GiftCards?retryWrites=true&w=majority";

const MongoClient = require("mongodb").MongoClient;

const nextConnect = require("next-connect");

const client = new MongoClient(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function database(req, res, next) {
  await client.connect();
  req.dbClient = client;
  req.db = client.db("GiftCards");
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
