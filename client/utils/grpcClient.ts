import { LoginUserRequest, LoginUserResponse } from "@/grpc/rpc_login_user_pb";
import { HomeLifeClient } from "@/grpc/Service_home_lifeServiceClientPb";
import { RpcError, Metadata, StatusCode } from "grpc-web";
import internal from "stream";
import { APItoError, APItoLoginResponse, HomeLifeRpcError, UnknownError } from "./converter";

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
        const resData = await res.json();
        const loginUserResponse = APItoLoginResponse(resData);
        resolve([null, loginUserResponse]);
      } catch (err) {
        const unknownError = UnknownError(err);
        resolve([unknownError, null]);
      }
    });
  }
}

export default GrpcGatewayClient;
