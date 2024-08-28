import * as jspb from 'google-protobuf'

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb'; // proto import: "google/protobuf/timestamp.proto"


export class Family extends jspb.Message {
  getId(): string;
  setId(value: string): Family;

  getName(): string;
  setName(value: string): Family;

  getOwnerId(): string;
  setOwnerId(value: string): Family;

  getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): Family;
  hasCreatedAt(): boolean;
  clearCreatedAt(): Family;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Family.AsObject;
  static toObject(includeInstance: boolean, msg: Family): Family.AsObject;
  static serializeBinaryToWriter(message: Family, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Family;
  static deserializeBinaryFromReader(message: Family, reader: jspb.BinaryReader): Family;
}

export namespace Family {
  export type AsObject = {
    id: string,
    name: string,
    ownerId: string,
    createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

