import * as jspb from 'google-protobuf'

import * as recipe_pb from './recipe_pb'; // proto import: "recipe.proto"


export class CreateRecipeRequest extends jspb.Message {
  getPublic(): boolean;
  setPublic(value: boolean): CreateRecipeRequest;

  getTitle(): string;
  setTitle(value: string): CreateRecipeRequest;

  getDescription(): string;
  setDescription(value: string): CreateRecipeRequest;

  getIframeLink(): string;
  setIframeLink(value: string): CreateRecipeRequest;

  getImageLink(): string;
  setImageLink(value: string): CreateRecipeRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateRecipeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateRecipeRequest): CreateRecipeRequest.AsObject;
  static serializeBinaryToWriter(message: CreateRecipeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateRecipeRequest;
  static deserializeBinaryFromReader(message: CreateRecipeRequest, reader: jspb.BinaryReader): CreateRecipeRequest;
}

export namespace CreateRecipeRequest {
  export type AsObject = {
    pb_public: boolean,
    title: string,
    description: string,
    iframeLink: string,
    imageLink: string,
  }
}

export class CreateRecipeResponse extends jspb.Message {
  getRecipe(): recipe_pb.Recipe | undefined;
  setRecipe(value?: recipe_pb.Recipe): CreateRecipeResponse;
  hasRecipe(): boolean;
  clearRecipe(): CreateRecipeResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateRecipeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateRecipeResponse): CreateRecipeResponse.AsObject;
  static serializeBinaryToWriter(message: CreateRecipeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateRecipeResponse;
  static deserializeBinaryFromReader(message: CreateRecipeResponse, reader: jspb.BinaryReader): CreateRecipeResponse;
}

export namespace CreateRecipeResponse {
  export type AsObject = {
    recipe?: recipe_pb.Recipe.AsObject,
  }
}

