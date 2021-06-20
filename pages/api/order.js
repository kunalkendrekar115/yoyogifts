import nextConnect from "next-connect";
import { getSession } from "next-auth/client";
import middleware from "../../src/db";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(403).json({ message: "Not Authenticated" });
    return;
  }

  const order = { ...req.body, orderDate: new Date() };

  const rec = await req.db
    .collection("users")
    .findOneAndUpdate(
      { emailId: session.user.email },
      { $push: { orders: { $each: [order], $position: 0 } } },
      { new: true }
    );

  res.status(200).send({ success: true });
});

export default handler;
