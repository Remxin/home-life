import * as jspb from 'google-protobuf'

import * as task_pb from './task_pb'; // proto import: "task.proto"


export class AssignTaskRequest extends jspb.Message {
  getTaskId(): string;
  setTaskId(value: string): AssignTaskRequest;

  getAssigneeId(): string;
  setAssigneeId(value: string): AssignTaskRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AssignTaskRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AssignTaskRequest): AssignTaskRequest.AsObject;
  static serializeBinaryToWriter(message: AssignTaskRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AssignTaskRequest;
  static deserializeBinaryFromReader(message: AssignTaskRequest, reader: jspb.BinaryReader): AssignTaskRequest;
}

export namespace AssignTaskRequest {
  export type AsObject = {
    taskId: string,
    assigneeId: string,
  }
}

export class AssignTaskResponse extends jspb.Message {
  getTask(): task_pb.Task | undefined;
  setTask(value?: task_pb.Task): AssignTaskResponse;
  hasTask(): boolean;
  clearTask(): AssignTaskResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AssignTaskResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AssignTaskResponse): AssignTaskResponse.AsObject;
  static serializeBinaryToWriter(message: AssignTaskResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AssignTaskResponse;
  static deserializeBinaryFromReader(message: AssignTaskResponse, reader: jspb.BinaryReader): AssignTaskResponse;
}

export namespace AssignTaskResponse {
  export type AsObject = {
    task?: task_pb.Task.AsObject,
  }
}

