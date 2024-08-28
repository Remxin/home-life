import * as jspb from 'google-protobuf'

import * as task_pb from './task_pb'; // proto import: "task.proto"
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb'; // proto import: "google/protobuf/timestamp.proto"


export class AddTaskRequest extends jspb.Message {
  getName(): string;
  setName(value: string): AddTaskRequest;

  getDescription(): string;
  setDescription(value: string): AddTaskRequest;

  getAssignedTo(): string;
  setAssignedTo(value: string): AddTaskRequest;

  getExecutionDate(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setExecutionDate(value?: google_protobuf_timestamp_pb.Timestamp): AddTaskRequest;
  hasExecutionDate(): boolean;
  clearExecutionDate(): AddTaskRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddTaskRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AddTaskRequest): AddTaskRequest.AsObject;
  static serializeBinaryToWriter(message: AddTaskRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddTaskRequest;
  static deserializeBinaryFromReader(message: AddTaskRequest, reader: jspb.BinaryReader): AddTaskRequest;
}

export namespace AddTaskRequest {
  export type AsObject = {
    name: string,
    description: string,
    assignedTo: string,
    executionDate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class AddTaskResponse extends jspb.Message {
  getTask(): task_pb.Task | undefined;
  setTask(value?: task_pb.Task): AddTaskResponse;
  hasTask(): boolean;
  clearTask(): AddTaskResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddTaskResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AddTaskResponse): AddTaskResponse.AsObject;
  static serializeBinaryToWriter(message: AddTaskResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddTaskResponse;
  static deserializeBinaryFromReader(message: AddTaskResponse, reader: jspb.BinaryReader): AddTaskResponse;
}

export namespace AddTaskResponse {
  export type AsObject = {
    task?: task_pb.Task.AsObject,
  }
}

