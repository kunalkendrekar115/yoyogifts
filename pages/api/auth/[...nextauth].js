import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import nextConnect from "next-connect";
import bcrypt from "bcryptjs";

import middleware from "../../../src/db";

const handler = nextConnect();

handler.use(middleware);

const authOptions = {
  session: {
    jwt: true
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials, req) {
        try {
          const user = await req.db
            .collection("users")
            .findOne({ emailId: credentials.emailId });

          if (user) {
            const verified = bcrypt.compareSync(
              credentials.password,
              user.password
            );
            if (verified) return { email: user.emailId, id: user.id };

            throw new Error("Invalid Password");
          }
          throw new Error("user does not exists");
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    })
  ]
};

handler.all((req, res) => NextAuth(req, res, authOptions));

export default handler;
