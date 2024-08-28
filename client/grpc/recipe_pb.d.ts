import * as jspb from 'google-protobuf'

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb'; // proto import: "google/protobuf/timestamp.proto"


export class Recipe extends jspb.Message {
  getId(): string;
  setId(value: string): Recipe;

  getCreatedBy(): string;
  setCreatedBy(value: string): Recipe;

  getPublic(): boolean;
  setPublic(value: boolean): Recipe;

  getTitle(): string;
  setTitle(value: string): Recipe;

  getDescription(): string;
  setDescription(value: string): Recipe;

  getIframeLink(): string;
  setIframeLink(value: string): Recipe;

  getImageLink(): string;
  setImageLink(value: string): Recipe;

  getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): Recipe;
  hasCreatedAt(): boolean;
  clearCreatedAt(): Recipe;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Recipe.AsObject;
  static toObject(includeInstance: boolean, msg: Recipe): Recipe.AsObject;
  static serializeBinaryToWriter(message: Recipe, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Recipe;
  static deserializeBinaryFromReader(message: Recipe, reader: jspb.BinaryReader): Recipe;
}

export namespace Recipe {
  export type AsObject = {
    id: string,
    createdBy: string,
    pb_public: boolean,
    title: string,
    description: string,
    iframeLink: string,
    imageLink: string,
    createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

