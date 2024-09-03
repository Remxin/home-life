
import { APItoError, HomeLifeRpcError, MissingHeadersError, UnknownError } from "./converter";
import { LoginUserResponse, GetFamilyResponse } from "./response.t";
import HomeLifeAsyncStorage from "./asyncStorage";
import { permission } from "process";

class GrpcGatewayClient {
  private static serverUrl: string = "http://192.168.0.108:8080";
  constructor() {}

  static async loginUser(
    email: string,
    password: string
  ): Promise<[HomeLifeRpcError | null, LoginUserResponse | null]> {
    return new Promise(async (resolve) => {
      try {
        const res = await fetch(`${this.serverUrl}/v1/login_user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          const rpcError = APItoError(errorData);
          resolve([rpcError, null]);
        }
        const resData = (await res.json()) as LoginUserResponse;
        resolve([null, resData]);
      } catch (err) {
        const unknownError = UnknownError(err);
        resolve([unknownError, null]);
      }
    });
  }

  static async getFamily(): Promise<[HomeLifeRpcError | null, GetFamilyResponse | null]> {
    return new Promise(async (resolve) => {
      const accessToken = await HomeLifeAsyncStorage.getData("access_token")
      const permissionToken = await HomeLifeAsyncStorage.getData("permissions_token")
      if (!accessToken || !permissionToken) {
        resolve([MissingHeadersError(), null])
      }
      console.log("access: ", accessToken, "\n", "permission: ", permissionToken)
      try {
        const res = await fetch(`${this.serverUrl}/v1/family`, {
          method: "GET",
          headers: {
            "authorization": `bearer ${accessToken}`,
            "permission_token": permissionToken
          }
        })
        const resData = await res.json()
        if (!res.ok) {
          const rpcError = APItoError(resData)
          resolve([rpcError, null])
        }

        resolve([null, resData as GetFamilyResponse])

      } catch (err) {
        const unknownError = UnknownError(err)
        resolve([unknownError, null])
      }
    })
  }
}

export default GrpcGatewayClient;
