import * as jspb from 'google-protobuf'

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb'; // proto import: "google/protobuf/timestamp.proto"


export class RenewAccessTokenResponse extends jspb.Message {
  getSessiondId(): string;
  setSessiondId(value: string): RenewAccessTokenResponse;

  getAccessToken(): string;
  setAccessToken(value: string): RenewAccessTokenResponse;

  getRefreshToken(): string;
  setRefreshToken(value: string): RenewAccessTokenResponse;

  getAccessTokenExpiresAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setAccessTokenExpiresAt(value?: google_protobuf_timestamp_pb.Timestamp): RenewAccessTokenResponse;
  hasAccessTokenExpiresAt(): boolean;
  clearAccessTokenExpiresAt(): RenewAccessTokenResponse;

  getRefreshTokenExpiresAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setRefreshTokenExpiresAt(value?: google_protobuf_timestamp_pb.Timestamp): RenewAccessTokenResponse;
  hasRefreshTokenExpiresAt(): boolean;
  clearRefreshTokenExpiresAt(): RenewAccessTokenResponse;

  getPermissionToken(): string;
  setPermissionToken(value: string): RenewAccessTokenResponse;
  hasPermissionToken(): boolean;
  clearPermissionToken(): RenewAccessTokenResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RenewAccessTokenResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RenewAccessTokenResponse): RenewAccessTokenResponse.AsObject;
  static serializeBinaryToWriter(message: RenewAccessTokenResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RenewAccessTokenResponse;
  static deserializeBinaryFromReader(message: RenewAccessTokenResponse, reader: jspb.BinaryReader): RenewAccessTokenResponse;
}

export namespace RenewAccessTokenResponse {
  export type AsObject = {
    sessiondId: string,
    accessToken: string,
    refreshToken: string,
    accessTokenExpiresAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    refreshTokenExpiresAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    permissionToken?: string,
  }

  export enum PermissionTokenCase { 
    _PERMISSION_TOKEN_NOT_SET = 0,
    PERMISSION_TOKEN = 6,
  }
}

