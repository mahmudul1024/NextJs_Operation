import { hashPassword } from "../../../helpers/auth";
import { connectDatabse } from "../../../helpers/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const data = req.body;
  const { email, password } = data;
  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message: "invalid Input -password should be atleat 7 characters",
    });
  }
  console.log("1");
  const client = await connectDatabse();
  console.log("2");
  const db = await client.db();
  console.log("3");
  const existingUser = await db
    .collection("AuthUsers")
    .findOne({ email: email });

  if (existingUser) {
    res.json({ message: "email exist already" });
    client.close();
    return;
  }

  const hashedpassword = await hashPassword(password);

  const result = await db.collection("AuthUsers").insertOne({
    email: email,
    password: hashedpassword,
  });

  res.status(201).json({ message: "user has created " });
  client.close();
}

export default handler;
