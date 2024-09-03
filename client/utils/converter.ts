import { LoginUserResponse } from "@/grpc/rpc_login_user_pb";
import { RpcError, StatusCode, Metadata } from "grpc-web";

export interface FieldViolation {
  field: string;
  description: string;
}

export class HomeLifeRpcError extends RpcError {
  constructor(code: StatusCode, message: string, metadata: Metadata) {
    super(code, message, metadata);
  }
  getFieldViolations(): FieldViolation[] | null {
    const fieldViolationsString = this.metadata["field_violations"];
    if (fieldViolationsString && typeof fieldViolationsString === "string") {
      try {
        return JSON.parse(fieldViolationsString) as FieldViolation[];
      } catch (err) {
        console.error("Failed to parse field violations:", err);
        return null;
      }
    }
    return null;
  }
}

export function APItoLoginResponse(
  successResponse: any
): LoginUserResponse | null {
  try {
    const loginUserResponse = new LoginUserResponse();
    loginUserResponse.setUser(successResponse.user);
    loginUserResponse.setSessionId(successResponse.session_id);
    loginUserResponse.setAccessToken(successResponse.access_token);
    loginUserResponse.setAccessTokenExpiresAt(
      successResponse.access_token_expires_at
    );
    loginUserResponse.setRefreshToken(successResponse.refresh_token);
    loginUserResponse.setRefreshTokenExpiresAt(
      successResponse.refresh_token_expires_at
    );
    loginUserResponse.setPermissionsToken(successResponse?.permission_token)
    return loginUserResponse;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export function APItoError(errorData: any): HomeLifeRpcError {
  const fieldViolations: FieldViolation[] =
    errorData.details?.[0]?.field_violations;
  const rpcError = new HomeLifeRpcError(errorData.code, errorData.message, {
    field_violations: JSON.stringify(fieldViolations),
  });

  return rpcError;
}

export function UnknownError(err: any): HomeLifeRpcError {
  const rpcError = new HomeLifeRpcError(
    StatusCode.UNKNOWN,
    (err as Error).message || "Unknown error",
    {}
  );
  return rpcError;
}

export function checkFieldsSet(fieldsArr: [string, string][]): FieldViolation[] {
    const violations = [] as FieldViolation[]
    for (let field of fieldsArr) {
        if (field[1]) continue
        violations.push({
            field: field[0],
            description: `${field[0]} is required`
        })
    }
    return violations
}
