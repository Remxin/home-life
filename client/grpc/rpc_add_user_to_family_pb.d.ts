import * as jspb from 'google-protobuf'

import * as permissions_pb from './permissions_pb'; // proto import: "permissions.proto"


export class AddUserToFamilyRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): AddUserToFamilyRequest;

  getCanRead(): boolean;
  setCanRead(value: boolean): AddUserToFamilyRequest;

  getCanEdit(): boolean;
  setCanEdit(value: boolean): AddUserToFamilyRequest;

  getCanCreate(): boolean;
  setCanCreate(value: boolean): AddUserToFamilyRequest;

  getCanModify(): boolean;
  setCanModify(value: boolean): AddUserToFamilyRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddUserToFamilyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AddUserToFamilyRequest): AddUserToFamilyRequest.AsObject;
  static serializeBinaryToWriter(message: AddUserToFamilyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddUserToFamilyRequest;
  static deserializeBinaryFromReader(message: AddUserToFamilyRequest, reader: jspb.BinaryReader): AddUserToFamilyRequest;
}

export namespace AddUserToFamilyRequest {
  export type AsObject = {
    userId: string,
    canRead: boolean,
    canEdit: boolean,
    canCreate: boolean,
    canModify: boolean,
  }
}

export class AddUserToFamilyResponse extends jspb.Message {
  getPermissions(): permissions_pb.Permissions | undefined;
  setPermissions(value?: permissions_pb.Permissions): AddUserToFamilyResponse;
  hasPermissions(): boolean;
  clearPermissions(): AddUserToFamilyResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddUserToFamilyResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AddUserToFamilyResponse): AddUserToFamilyResponse.AsObject;
  static serializeBinaryToWriter(message: AddUserToFamilyResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddUserToFamilyResponse;
  static deserializeBinaryFromReader(message: AddUserToFamilyResponse, reader: jspb.BinaryReader): AddUserToFamilyResponse;
}

export namespace AddUserToFamilyResponse {
  export type AsObject = {
    permissions?: permissions_pb.Permissions.AsObject,
  }
}

