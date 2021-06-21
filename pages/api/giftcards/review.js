import nextConnect from "next-connect";
import { getSession } from "next-auth/client";
import middleware from "../../../src/db";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(403).json({ message: "Not Authenticated" });
    return;
  }

  const user = await req.db
    .collection("users")
    .findOne({ emailId: session.user.email }, { fields: { password: 0 } });

  const review = {
    ...req.body,
    reviewDate: new Date(),
    emailId: user.emailId,
    name: user.firstName + " " + user.lastName
  };

  const rec = await req.db
    .collection("giftscards")
    .findOneAndUpdate(
      { name: req.body.name },
      { $push: { reviews: { $each: [review], $position: 0 } } },
      { new: true }
    );

  res.status(200).send(review);
});

export default handler;
