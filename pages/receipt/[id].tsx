import type { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useRouter } from "next/router";
import { getMongoDBClient } from "lib/getMongoDBClient";
import { useAppDispatch } from "lib/store";
import { loadReceipt, Receipt, receiptSchema } from "lib/receipt/slice";
import ReceiptForm from "lib/receipt/Form";

interface ServerSideProps {
  id: string;
  receipt: Receipt | null;
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  context
) => {
  const requestedId = context.params?.id;
  console.log("Requested ID", requestedId);
  if (typeof requestedId !== "string")
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };

  const client = await getMongoDBClient();
  const receipts = client.collection("receipts");
  const receiptData = await receipts.findOne({ id: requestedId });

  const receipt = receiptSchema.nullable().parse(receiptData);

  return {
    props: { id: requestedId, receipt },
  };
};

let socket: Socket;

const ReceiptPage: NextPage<ServerSideProps> = ({
  id,
  receipt,
}: ServerSideProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  if (receipt !== null) dispatch(loadReceipt(receipt));

  if (typeof id !== "string") {
    router.push(`/`);
    return <></>;
  }

  // Connect to the socket server
  useEffect(() => {
    const socketInitializer = async () => {
      await fetch("/api/socket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ receiptId: id }),
      });
      socket = io();

      socket.on("connect", () => {
        console.log("client connected");
      });

      socket.on("update-input", (msg) => {
        console.log("client", msg);
      });
    };

    if (id) {
      socketInitializer();
    }
  }, [id]);

  return <ReceiptForm id={id} />;
};

export default ReceiptPage;
