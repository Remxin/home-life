import * as jspb from 'google-protobuf'



export class Permissions extends jspb.Message {
  getId(): string;
  setId(value: string): Permissions;

  getFamilyId(): string;
  setFamilyId(value: string): Permissions;

  getCanRead(): boolean;
  setCanRead(value: boolean): Permissions;

  getCanEdit(): boolean;
  setCanEdit(value: boolean): Permissions;

  getCanCreate(): boolean;
  setCanCreate(value: boolean): Permissions;

  getCanModify(): boolean;
  setCanModify(value: boolean): Permissions;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Permissions.AsObject;
  static toObject(includeInstance: boolean, msg: Permissions): Permissions.AsObject;
  static serializeBinaryToWriter(message: Permissions, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Permissions;
  static deserializeBinaryFromReader(message: Permissions, reader: jspb.BinaryReader): Permissions;
}

export namespace Permissions {
  export type AsObject = {
    id: string,
    familyId: string,
    canRead: boolean,
    canEdit: boolean,
    canCreate: boolean,
    canModify: boolean,
  }
}

