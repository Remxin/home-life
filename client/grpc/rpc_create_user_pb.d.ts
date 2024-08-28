import * as jspb from 'google-protobuf'

import * as user_pb from './user_pb'; // proto import: "user.proto"


export class CreateUserRequest extends jspb.Message {
  getId(): string;
  setId(value: string): CreateUserRequest;

  getName(): string;
  setName(value: string): CreateUserRequest;

  getEmail(): string;
  setEmail(value: string): CreateUserRequest;

  getPassword(): string;
  setPassword(value: string): CreateUserRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateUserRequest): CreateUserRequest.AsObject;
  static serializeBinaryToWriter(message: CreateUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateUserRequest;
  static deserializeBinaryFromReader(message: CreateUserRequest, reader: jspb.BinaryReader): CreateUserRequest;
}

export namespace CreateUserRequest {
  export type AsObject = {
    id: string,
    name: string,
    email: string,
    password: string,
  }
}

export class CreateUserResponse extends jspb.Message {
  getUser(): user_pb.User | undefined;
  setUser(value?: user_pb.User): CreateUserResponse;
  hasUser(): boolean;
  clearUser(): CreateUserResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateUserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateUserResponse): CreateUserResponse.AsObject;
  static serializeBinaryToWriter(message: CreateUserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateUserResponse;
  static deserializeBinaryFromReader(message: CreateUserResponse, reader: jspb.BinaryReader): CreateUserResponse;
}

export namespace CreateUserResponse {
  export type AsObject = {
    user?: user_pb.User.AsObject,
  }
}

