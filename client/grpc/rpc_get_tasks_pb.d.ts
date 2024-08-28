import * as jspb from 'google-protobuf'

import * as task_pb from './task_pb'; // proto import: "task.proto"
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb'; // proto import: "google/protobuf/timestamp.proto"


export class GetTasksRequest extends jspb.Message {
  getSearchBy(): SearchBy;
  setSearchBy(value: SearchBy): GetTasksRequest;

  getDateFrom(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setDateFrom(value?: google_protobuf_timestamp_pb.Timestamp): GetTasksRequest;
  hasDateFrom(): boolean;
  clearDateFrom(): GetTasksRequest;

  getDateTo(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setDateTo(value?: google_protobuf_timestamp_pb.Timestamp): GetTasksRequest;
  hasDateTo(): boolean;
  clearDateTo(): GetTasksRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTasksRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTasksRequest): GetTasksRequest.AsObject;
  static serializeBinaryToWriter(message: GetTasksRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTasksRequest;
  static deserializeBinaryFromReader(message: GetTasksRequest, reader: jspb.BinaryReader): GetTasksRequest;
}

export namespace GetTasksRequest {
  export type AsObject = {
    searchBy: SearchBy,
    dateFrom?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    dateTo?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class GetTasksResponse extends jspb.Message {
  getTasksList(): Array<task_pb.Task>;
  setTasksList(value: Array<task_pb.Task>): GetTasksResponse;
  clearTasksList(): GetTasksResponse;
  addTasks(value?: task_pb.Task, index?: number): task_pb.Task;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTasksResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTasksResponse): GetTasksResponse.AsObject;
  static serializeBinaryToWriter(message: GetTasksResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTasksResponse;
  static deserializeBinaryFromReader(message: GetTasksResponse, reader: jspb.BinaryReader): GetTasksResponse;
}

export namespace GetTasksResponse {
  export type AsObject = {
    tasksList: Array<task_pb.Task.AsObject>,
  }
}

export enum SearchBy { 
  FAMILY_ID = 0,
  ASSIGNED_TO = 1,
}
