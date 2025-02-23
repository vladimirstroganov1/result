export class Http {
  private api: string;

  constructor(api = "http://localhost:4001") {
    this.api = api;
    // custom headers, auth, other configs...
  }

  private async request(
    endpoint: string,
    options?: RequestInit
  ): Promise<Response> {
    const url = this.api + endpoint;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return Promise.resolve(response);
    } catch (error) {
      console.error("Request failed:", error);
      throw error;
    }
  }

  public get(endpoint: string): Promise<Response> {
    return this.request(endpoint, {
      method: "GET",
    });
  }

  public patch(
    endpoint: string,
    body: { [key: string]: any }
  ): Promise<Response> {
    return this.request(endpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  public delete(endpoint: string): Promise<Response> {
    return this.request(endpoint, {
      method: "DELETE",
    });
  }
}

const http = new Http();

export default http;
