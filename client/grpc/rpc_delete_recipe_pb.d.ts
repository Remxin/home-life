import * as jspb from 'google-protobuf'

import * as recipe_pb from './recipe_pb'; // proto import: "recipe.proto"


export class DeleteRecipeRequest extends jspb.Message {
  getId(): string;
  setId(value: string): DeleteRecipeRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteRecipeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteRecipeRequest): DeleteRecipeRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteRecipeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteRecipeRequest;
  static deserializeBinaryFromReader(message: DeleteRecipeRequest, reader: jspb.BinaryReader): DeleteRecipeRequest;
}

export namespace DeleteRecipeRequest {
  export type AsObject = {
    id: string,
  }
}

export class DeleteRecipeResponse extends jspb.Message {
  getRecipe(): recipe_pb.Recipe | undefined;
  setRecipe(value?: recipe_pb.Recipe): DeleteRecipeResponse;
  hasRecipe(): boolean;
  clearRecipe(): DeleteRecipeResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteRecipeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteRecipeResponse): DeleteRecipeResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteRecipeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteRecipeResponse;
  static deserializeBinaryFromReader(message: DeleteRecipeResponse, reader: jspb.BinaryReader): DeleteRecipeResponse;
}

export namespace DeleteRecipeResponse {
  export type AsObject = {
    recipe?: recipe_pb.Recipe.AsObject,
  }
}

