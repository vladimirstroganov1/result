import { Form, Link, Outlet } from "react-router";
import type { Route } from "./+types/sidebar";

import type { IAddress } from "~/interfaces/address";

export async function clientLoader() {
  const response = await fetch("http://localhost:4001");

  return response.json();
}

export default function SidebarLayout({ loaderData }: Route.ComponentProps) {
  const { addresses } = loaderData;

  return (
    <div className="flex w-full">
      <div className="relative flex w-min flex-col rounded-lg bg-white shadow-sm border border-slate-200">
        <h1 className="self-center text-xl p-4 font-semibold whitespace-nowrap dark:text-white">
          Address book
        </h1>
        <nav className="flex w-min flex-col gap-1 p-1.5">
          {addresses.map((address: IAddress) => (
            <div key={address.id}>
              <Link
                to={`address/${address.id}`}
                className="text-slate-800 flex min-w-[240px] items-center rounded-md p-3 transition-all hover:bg-slate-100"
              >
                {address.country}
              </Link>
            </div>
          ))}
        </nav>
      </div>

      <div className="flex w-full justify-center items-center">
        <Outlet />
      </div>
    </div>
  );

  return (
    <>
      <div id="sidebar">
        <h1>
          <Link to="about">React Router Contacts</Link>
        </h1>
        <nav>
          {addresses.length ? (
            <ul>
              {addresses.map((address: IAddress) => (
                <li key={address.id}>
                  <Link to={`address/${address.id}`}>{address.country}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No addresses</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
