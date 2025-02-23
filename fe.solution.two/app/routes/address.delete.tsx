import { redirect } from "react-router";
import type { Route } from "./+types/address.delete";

export async function clientAction({ params }: Route.ActionArgs) {
  await fetch(`http://localhost:4001/${params.addressId}`, {
    method: "DELETE",
  });

  return redirect("/");
}
