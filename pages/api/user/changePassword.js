import { getSession } from "next-auth/client";
import { hashPassword, verifyPassword } from "../../../helpers/auth";
import { connectDatabse } from "../../../helpers/db";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  console.log("dukhse.............");

  const session = await getSession({ req: req });
  if (!session) {
    res.json({ message: "not authenticated !" });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectDatabse();
  const userCollection = await client.db().collection("AuthUsers");
  const user = await userCollection.findOne({ email: userEmail });
  if (!user) {
    res.json({ message: "user not found" });
    client.close();
    return;
  }
  console.log(user);

  const currentPassword = user.password;
  const passwordAreEqual = await verifyPassword(oldPassword, currentPassword);
  console.log(passwordAreEqual);
  console.log(oldPassword, currentPassword);
  console.log("newpas", newPassword);
  if (!passwordAreEqual) {
    res.json({ message: "Invalid Password" });
    client.close();
    return;
  }
  console.log("1");
  const hanshedPassword = await hashPassword(newPassword);
  console.log("2");
  const result = await userCollection.updateOne(
    { email: userEmail },
    { $set: { password: hanshedPassword } }
  );

  client.close();
  res.json({ message: "password Updated" });
}
export default handler;
