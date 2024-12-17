import CheckoutWrapper from "@/app/_components/CheckoutWrapper";
import { auth } from "@/app/_lib/auth";

// import EventImage from "@/app/_components/eventImage";

export default async function Page({ params }) {
  const { user } = await auth();


  return (
    <div>
      <CheckoutWrapper params={params} user={user} />
    </div>
  );
}
