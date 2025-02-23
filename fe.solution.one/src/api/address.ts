import http from "./http";

import { IAddress } from "src/interfaces/Address";

export class Address {
  private url: string;

  constructor(entity = "/") {
    this.url = entity;
  }

  public get(): Promise<IAddress[]> {
    return http
      .get(this.url)
      .then((response: Response) => response.json())
      .then((data) => data.addresses);
  }

  public update(data: IAddress) {
    return http.patch(`${this.url}${data.id}`, data);
  }

  public delete(id: string) {
    return http.delete(`${this.url}${id}`);
  }
}

export default Address;
