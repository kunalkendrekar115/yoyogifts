// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nextConnect from "next-connect";
import bcrypt from "bcryptjs";

import middleware from "../../src/db";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  try {
    const existingUser = await req.db.collection("users").findOne({ emailId: req.body.emailId });

    if (existingUser) {
      res.status(422).json({ error: "user already exists" });
      return;
    }

    const passwordHash = bcrypt.hashSync(req.body.password, 10);
    const user = { ...req.body, password: passwordHash };

    await req.db.collection("users").insert(user);
    res.status(200).json({ message: "User created" });
  } catch (error) {
    console.log(error);
    res.status(200).send(error);
  }
});

export default handler;
