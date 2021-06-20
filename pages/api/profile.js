import nextConnect from "next-connect";
import { getSession } from "next-auth/client";
import middleware from "../../src/db";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(403).json({ message: "Not Authenticated" });
    return;
  }

  const user = await req.db
    .collection("users")
    .findOne({ emailId: session.user.email }, { fields: { password: 0 } });

  res.status(200).send(user);
});

export default handler;
