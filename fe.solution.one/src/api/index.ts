import Address from "./address";

interface API {
  address: Address;
}

export const API: API = {
  address: new Address("/"),
};

export default API;
