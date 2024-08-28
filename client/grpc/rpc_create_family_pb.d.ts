import * as jspb from 'google-protobuf'

import * as family_pb from './family_pb'; // proto import: "family.proto"


export class CreateFamilyRequest extends jspb.Message {
  getFamilyName(): string;
  setFamilyName(value: string): CreateFamilyRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateFamilyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateFamilyRequest): CreateFamilyRequest.AsObject;
  static serializeBinaryToWriter(message: CreateFamilyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateFamilyRequest;
  static deserializeBinaryFromReader(message: CreateFamilyRequest, reader: jspb.BinaryReader): CreateFamilyRequest;
}

export namespace CreateFamilyRequest {
  export type AsObject = {
    familyName: string,
  }
}

export class CreateFamilyResponse extends jspb.Message {
  getFamily(): family_pb.Family | undefined;
  setFamily(value?: family_pb.Family): CreateFamilyResponse;
  hasFamily(): boolean;
  clearFamily(): CreateFamilyResponse;

  getPermissionToken(): string;
  setPermissionToken(value: string): CreateFamilyResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateFamilyResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateFamilyResponse): CreateFamilyResponse.AsObject;
  static serializeBinaryToWriter(message: CreateFamilyResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateFamilyResponse;
  static deserializeBinaryFromReader(message: CreateFamilyResponse, reader: jspb.BinaryReader): CreateFamilyResponse;
}

export namespace CreateFamilyResponse {
  export type AsObject = {
    family?: family_pb.Family.AsObject,
    permissionToken: string,
  }
}

