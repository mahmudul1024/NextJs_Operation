import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { verifyPassword } from "../../../helpers/auth";
import { connectDatabse } from "../../../helpers/db";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      // credentials obj will be sent from the client side email ,password
      async authorize(credentials) {
        const client = await connectDatabse();

        const usersCollection = client.db().collection("AuthUsers");
        // if found then will return that user object
        const user = await usersCollection.findOne({
          email: credentials.email,
        });
        if (!user) {
          client.close();
          throw new Error("could not log in");
        }
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("password not matched");
        }
        // this obj will encoded by JWT
        client.close();
        return { email: user.email };
      },
    }),
  ],
});
