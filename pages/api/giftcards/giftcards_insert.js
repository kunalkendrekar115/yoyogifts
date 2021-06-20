// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import nextConnect from "next-connect";
import middleware from "../../../src/db";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const rec = await req.db.collection("giftscards").insertMany([
    {
      name: "Amazon Pay Special gift card",
      description: "e-gifts cards",
      image: "makemytrip",
      category: "Travel and hospitalit"
    }
  ]);

  res.status(200).json(rec);
});

export default handler;
