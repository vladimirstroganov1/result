import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/sidebar.tsx", [
    index("routes/home.tsx"),
    route("address/:addressId", "routes/address.tsx"),
    route("address/:addressId/edit", "routes/address.edit.tsx"),
    route("address/:addressId/delete", "routes/address.delete.tsx"),
  ]),
] satisfies RouteConfig;
