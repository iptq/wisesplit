import { useParams } from "solid-start";
import ReceiptForm from "~/lib/receipt/Form";

export default function () {
  const params = useParams();

  return <ReceiptForm id={params.id} />;
}
