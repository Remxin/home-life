import {
  APItoError,
  HomeLifeRpcError,
  MissingHeadersError,
  UnknownError,
} from "./converter";
import {
  LoginUserResponse,
  GetFamilyResponse,
  CreateFamilyResponse,
  RenewAccessTokenResponse,
} from "../types/response.t";
import HomeLifeAsyncStorage, { AsyncStorageKeys } from "./asyncStorage";

type APIMethods = "GET" | "POST" | "DELETE" | "PATCH";
type APIHeaders = {
  [key: string]: string;
};

type APIResponse<T> = Promise<[HomeLifeRpcError, null] | [null, T]>;

class GrpcGatewayClient {
  private static serverUrl: string = "http://192.168.0.108:8080";

  private static async makeRequest<T, R>(
    path: string,
    include_headers: AsyncStorageKeys[],
    method: APIMethods,
    body: T
  ): APIResponse<R> {
    return new Promise(async (resolve) => {
      const headers: APIHeaders = {
        "Content-Type": "application/json",
      };

      for (let newHeader of include_headers) {
        const headerValue = await HomeLifeAsyncStorage.getData(newHeader);
        if (!newHeader) resolve([MissingHeadersError(), null]);

        if (newHeader === "access_token")
          headers["authorization"] = `bearer ${headerValue}`;
        else headers[newHeader] = headerValue;
      }
      console.log(headers)
      const requestParams: RequestInit = {
        method,
        headers,
      };
      if (method === "POST") {
        requestParams["body"] = JSON.stringify(body);
      }
      try {
        const res = await fetch(`${this.serverUrl}${path}`, requestParams);

        const resData = await res.json();
        if (!res.ok) resolve([APItoError(resData), null]);
        resolve([null, resData as R]);
      } catch (err) {
        resolve([UnknownError(err), null]);
      }
    });
  }

  static async loginUser(
    email: string,
    password: string
  ): APIResponse<LoginUserResponse> {
    return this.makeRequest<
      { email: string; password: string },
      LoginUserResponse
    >("/v1/login_user", [], "POST", {
      email,
      password,
    });
  }

  static async getFamily(): Promise<
    [HomeLifeRpcError | null, GetFamilyResponse | null]
  > {
    return this.makeRequest<{}, GetFamilyResponse>(
      "/v1/family",
      ["access_token", "permission_token"],
      "GET",
      {}
    );
  }

  static async createFamily(
    family_name: string
  ): Promise<[HomeLifeRpcError | null, CreateFamilyResponse | null]> {
    return this.makeRequest<{}, CreateFamilyResponse>(
      "/v1/family",
      ["access_token"],
      "POST",
      {
        family_name,
      }
    );
  }

  static async renewAccessToken(): APIResponse<RenewAccessTokenResponse> {
    return this.makeRequest<{}, RenewAccessTokenResponse>(
      "/v1/user/renew_token",
      ["refresh_token"],
      "POST",
      {}
    );
  }
}

export default GrpcGatewayClient;
