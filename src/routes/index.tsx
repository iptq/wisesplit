import { APIEvent } from "solid-start";
import { redirect } from "solid-start/server";
import { getMongoDBClient } from "~/lib/mongodb";

export async function GET({}: APIEvent) {
  const client = await getMongoDBClient();
  const receipts = client.collection("receipts");
  const newReceipt = await receipts.insertOne({});
  const id = newReceipt.insertedId.toString();
  console.log("New id", id);
  return redirect(`/receipt/${id}`);
}
