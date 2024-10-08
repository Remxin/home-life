import { GetFamilyResponse } from "@/grpc/rpc_get_family_pb";
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

export function MissingHeadersError(): HomeLifeRpcError {
  const rpcError = new HomeLifeRpcError(
    StatusCode.UNAUTHENTICATED,
    "missing authentication headers",
    {}
  )

  return rpcError
}
