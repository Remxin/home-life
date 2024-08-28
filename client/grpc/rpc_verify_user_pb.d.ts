import * as jspb from 'google-protobuf'



export class VerifyUserRequest extends jspb.Message {
  getEmailId(): string;
  setEmailId(value: string): VerifyUserRequest;

  getSecretCode(): string;
  setSecretCode(value: string): VerifyUserRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VerifyUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: VerifyUserRequest): VerifyUserRequest.AsObject;
  static serializeBinaryToWriter(message: VerifyUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VerifyUserRequest;
  static deserializeBinaryFromReader(message: VerifyUserRequest, reader: jspb.BinaryReader): VerifyUserRequest;
}

export namespace VerifyUserRequest {
  export type AsObject = {
    emailId: string,
    secretCode: string,
  }
}

export class VerifyUserResponse extends jspb.Message {
  getIsVerified(): boolean;
  setIsVerified(value: boolean): VerifyUserResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VerifyUserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: VerifyUserResponse): VerifyUserResponse.AsObject;
  static serializeBinaryToWriter(message: VerifyUserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VerifyUserResponse;
  static deserializeBinaryFromReader(message: VerifyUserResponse, reader: jspb.BinaryReader): VerifyUserResponse;
}

export namespace VerifyUserResponse {
  export type AsObject = {
    isVerified: boolean,
  }
}

