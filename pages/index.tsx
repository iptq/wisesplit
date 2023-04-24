import { GetServerSideProps, NextPage } from "next";
import { getMongoDBClient } from "../lib/getMongoDBClient";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = await getMongoDBClient();
  const receipts = client.collection("receipts");
  const newReceipt = await receipts.insertOne({});
  const id = newReceipt.insertedId.toString();

  return {
    redirect: {
      permanent: false,
      destination: `/receipt/${id}`,
    },
  };
};

const Home: NextPage = () => {
  return <></>;
};

export default Home;
