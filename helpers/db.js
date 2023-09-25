import { MongoClient } from "mongodb";

export async function connectDatabse() {
  const client = await MongoClient.connect(
    "mongodb+srv://NextAuthUser:zwFkZbHl7fpJ6NES@cluster0.n9cwtsk.mongodb.net/nextauth?retryWrites=true&w=majority"
  );

  return client;
}
