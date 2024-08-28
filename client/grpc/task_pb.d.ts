import * as jspb from 'google-protobuf'

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb'; // proto import: "google/protobuf/timestamp.proto"


export class Task extends jspb.Message {
  getId(): string;
  setId(value: string): Task;

  getName(): string;
  setName(value: string): Task;

  getDescription(): string;
  setDescription(value: string): Task;

  getDone(): boolean;
  setDone(value: boolean): Task;

  getFamilyId(): string;
  setFamilyId(value: string): Task;

  getCreatedBy(): string;
  setCreatedBy(value: string): Task;

  getAssignedTo(): string;
  setAssignedTo(value: string): Task;

  getExecutionDate(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setExecutionDate(value?: google_protobuf_timestamp_pb.Timestamp): Task;
  hasExecutionDate(): boolean;
  clearExecutionDate(): Task;

  getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): Task;
  hasCreatedAt(): boolean;
  clearCreatedAt(): Task;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Task.AsObject;
  static toObject(includeInstance: boolean, msg: Task): Task.AsObject;
  static serializeBinaryToWriter(message: Task, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Task;
  static deserializeBinaryFromReader(message: Task, reader: jspb.BinaryReader): Task;
}

export namespace Task {
  export type AsObject = {
    id: string,
    name: string,
    description: string,
    done: boolean,
    familyId: string,
    createdBy: string,
    assignedTo: string,
    executionDate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

