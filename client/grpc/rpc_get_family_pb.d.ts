import * as jspb from 'google-protobuf'

import * as family_pb from './family_pb'; // proto import: "family.proto"
import * as user_pb from './user_pb'; // proto import: "user.proto"


export class GetFamilyResponse extends jspb.Message {
  getFamily(): family_pb.Family | undefined;
  setFamily(value?: family_pb.Family): GetFamilyResponse;
  hasFamily(): boolean;
  clearFamily(): GetFamilyResponse;

  getMembersList(): Array<user_pb.User>;
  setMembersList(value: Array<user_pb.User>): GetFamilyResponse;
  clearMembersList(): GetFamilyResponse;
  addMembers(value?: user_pb.User, index?: number): user_pb.User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFamilyResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetFamilyResponse): GetFamilyResponse.AsObject;
  static serializeBinaryToWriter(message: GetFamilyResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFamilyResponse;
  static deserializeBinaryFromReader(message: GetFamilyResponse, reader: jspb.BinaryReader): GetFamilyResponse;
}

export namespace GetFamilyResponse {
  export type AsObject = {
    family?: family_pb.Family.AsObject,
    membersList: Array<user_pb.User.AsObject>,
  }
}

