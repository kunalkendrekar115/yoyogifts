import nextConnect from "next-connect";
import middleware from "../../../src/db";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const { name, category, limit = 0, search } = req.query;

  let inputQuery = { ...(name && { name }), ...(category && { category }) };

  if (search) {
    inputQuery = {
      $or: [
        { denominations: search },
        { name: new RegExp(search, "i") },
        { keywords: new RegExp(search, "i") }
      ]
    };
  }

  const records = await req.db
    .collection("giftscards")
    .find(inputQuery)
    .limit(+limit)
    .collation({ locale: "en", strength: 2 });

  records.toArray(function (err, result) {
    if (err) throw err;

    res.json(result);
  });
});

export default handler;
