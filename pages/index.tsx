import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const newPage = async () => {
      let res = await fetch("/api/createReceipt", { method: "POST" });
      let result = await res.json();
      let id = result.id;
      if (typeof id != "string") return;
      router.push(`/receipt/${id}`);
    };

    newPage();
  });

  return <></>;
};

export default Home;
