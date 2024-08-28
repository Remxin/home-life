import * as jspb from 'google-protobuf'

import * as task_pb from './task_pb'; // proto import: "task.proto"


export class MarkTaskAsDoneRequest extends jspb.Message {
  getTaskId(): string;
  setTaskId(value: string): MarkTaskAsDoneRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MarkTaskAsDoneRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MarkTaskAsDoneRequest): MarkTaskAsDoneRequest.AsObject;
  static serializeBinaryToWriter(message: MarkTaskAsDoneRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MarkTaskAsDoneRequest;
  static deserializeBinaryFromReader(message: MarkTaskAsDoneRequest, reader: jspb.BinaryReader): MarkTaskAsDoneRequest;
}

export namespace MarkTaskAsDoneRequest {
  export type AsObject = {
    taskId: string,
  }
}

export class MarkTaskAsDoneResponse extends jspb.Message {
  getTask(): task_pb.Task | undefined;
  setTask(value?: task_pb.Task): MarkTaskAsDoneResponse;
  hasTask(): boolean;
  clearTask(): MarkTaskAsDoneResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MarkTaskAsDoneResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MarkTaskAsDoneResponse): MarkTaskAsDoneResponse.AsObject;
  static serializeBinaryToWriter(message: MarkTaskAsDoneResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MarkTaskAsDoneResponse;
  static deserializeBinaryFromReader(message: MarkTaskAsDoneResponse, reader: jspb.BinaryReader): MarkTaskAsDoneResponse;
}

export namespace MarkTaskAsDoneResponse {
  export type AsObject = {
    task?: task_pb.Task.AsObject,
  }
}

