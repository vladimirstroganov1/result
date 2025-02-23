import { useLoaderData, Form, redirect, useNavigate } from "react-router";
import type { Route } from "./+types/address.edit";

export async function clientLoader({ params }: Route.LoaderArgs) {
  const response = await fetch(`http://localhost:4001/${params.addressId}`);

  if (!response.ok) {
    throw new Response("Address not found", { status: 404 });
  }

  return response.json();
}

export async function clientAction({ params, request }: Route.ActionArgs) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  await fetch(`http://localhost:4001/${params.addressId}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return redirect(`/address/${params.addressId}`);
}

export default function AddressEdit() {
  const navigate = useNavigate();
  const { address } = useLoaderData();

  if (!address) {
    return <div>Address not found</div>;
  }

  return (
    <Form
      key={address.id}
      id="address-edit"
      method="patch"
      className="max-w-md mx-auto"
    >
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="country"
          id="country"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          defaultValue={address.country}
        />
        <label
          htmlFor="country"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Country
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="address"
          id="address"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          defaultValue={address.address}
          required
        />
        <label
          htmlFor="address"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Address
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="zip"
          id="zip"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          defaultValue={address.zip}
          required
        />
        <label
          htmlFor="zip"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          ZIP
        </label>
      </div>

      <div className="flex justify-center items-center space-x-4 p-4">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
        >
          Save
        </button>
        <button
          type="button"
          className="text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
          onClick={() => navigate(`/address/${address.id}`)}
        >
          Cancel
        </button>
      </div>
    </Form>
  );
}
