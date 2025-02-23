import { Link, Form, useLoaderData } from "react-router";
import type { Route } from "./+types/home";

export async function clientLoader({ params }: Route.LoaderArgs) {
  const response = await fetch(`http://localhost:4001/${params.addressId}`);

  if (!response.ok) {
    throw new Response("Address not found", { status: 404 });
  }

  return response.json();
}

export default function Address() {
  const { address } = useLoaderData();

  if (!address) {
    return <div>Address not found</div>;
  }

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center py-8">
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {address.country}
        </h5>
        <span className="text-sm text-gray-700 dark:text-gray-400">
          {address.address}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {address.zip}
        </span>
        <div className="flex justify-center items-center space-x-4 p-4">
          <Link
            to={`/address/${address.id}/edit`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
          >
            Edit
          </Link>
          <Form
            action="delete"
            method="delete"
            onSubmit={(event) => {
              const response = confirm(
                "Please confirm you want to delete this record."
              );
              if (!response) {
                event.preventDefault();
              }
            }}
          >
            <button
              type="submit"
              className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
