import * as jspb from 'google-protobuf'

import * as recipe_pb from './recipe_pb'; // proto import: "recipe.proto"


export class UpdateRecipeRequest extends jspb.Message {
  getId(): string;
  setId(value: string): UpdateRecipeRequest;

  getPublic(): boolean;
  setPublic(value: boolean): UpdateRecipeRequest;
  hasPublic(): boolean;
  clearPublic(): UpdateRecipeRequest;

  getTitle(): string;
  setTitle(value: string): UpdateRecipeRequest;
  hasTitle(): boolean;
  clearTitle(): UpdateRecipeRequest;

  getDescription(): string;
  setDescription(value: string): UpdateRecipeRequest;
  hasDescription(): boolean;
  clearDescription(): UpdateRecipeRequest;

  getIframeLink(): string;
  setIframeLink(value: string): UpdateRecipeRequest;
  hasIframeLink(): boolean;
  clearIframeLink(): UpdateRecipeRequest;

  getImageLink(): string;
  setImageLink(value: string): UpdateRecipeRequest;
  hasImageLink(): boolean;
  clearImageLink(): UpdateRecipeRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateRecipeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateRecipeRequest): UpdateRecipeRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateRecipeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateRecipeRequest;
  static deserializeBinaryFromReader(message: UpdateRecipeRequest, reader: jspb.BinaryReader): UpdateRecipeRequest;
}

export namespace UpdateRecipeRequest {
  export type AsObject = {
    id: string,
    pb_public?: boolean,
    title?: string,
    description?: string,
    iframeLink?: string,
    imageLink?: string,
  }

  export enum PublicCase { 
    _PUBLIC_NOT_SET = 0,
    PUBLIC = 2,
  }

  export enum TitleCase { 
    _TITLE_NOT_SET = 0,
    TITLE = 3,
  }

  export enum DescriptionCase { 
    _DESCRIPTION_NOT_SET = 0,
    DESCRIPTION = 4,
  }

  export enum IframeLinkCase { 
    _IFRAME_LINK_NOT_SET = 0,
    IFRAME_LINK = 5,
  }

  export enum ImageLinkCase { 
    _IMAGE_LINK_NOT_SET = 0,
    IMAGE_LINK = 6,
  }
}

export class UpdateRecipeResponse extends jspb.Message {
  getRecipe(): recipe_pb.Recipe | undefined;
  setRecipe(value?: recipe_pb.Recipe): UpdateRecipeResponse;
  hasRecipe(): boolean;
  clearRecipe(): UpdateRecipeResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateRecipeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateRecipeResponse): UpdateRecipeResponse.AsObject;
  static serializeBinaryToWriter(message: UpdateRecipeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateRecipeResponse;
  static deserializeBinaryFromReader(message: UpdateRecipeResponse, reader: jspb.BinaryReader): UpdateRecipeResponse;
}

export namespace UpdateRecipeResponse {
  export type AsObject = {
    recipe?: recipe_pb.Recipe.AsObject,
  }
}

