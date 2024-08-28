import * as jspb from 'google-protobuf'

import * as recipe_pb from './recipe_pb'; // proto import: "recipe.proto"


export class GetRecipesRequest extends jspb.Message {
  getSearch(): Search;
  setSearch(value: Search): GetRecipesRequest;

  getTitle(): string;
  setTitle(value: string): GetRecipesRequest;
  hasTitle(): boolean;
  clearTitle(): GetRecipesRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRecipesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetRecipesRequest): GetRecipesRequest.AsObject;
  static serializeBinaryToWriter(message: GetRecipesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRecipesRequest;
  static deserializeBinaryFromReader(message: GetRecipesRequest, reader: jspb.BinaryReader): GetRecipesRequest;
}

export namespace GetRecipesRequest {
  export type AsObject = {
    search: Search,
    title?: string,
  }

  export enum TitleCase { 
    _TITLE_NOT_SET = 0,
    TITLE = 2,
  }
}

export class GetRecipesResponse extends jspb.Message {
  getRecipesList(): Array<recipe_pb.Recipe>;
  setRecipesList(value: Array<recipe_pb.Recipe>): GetRecipesResponse;
  clearRecipesList(): GetRecipesResponse;
  addRecipes(value?: recipe_pb.Recipe, index?: number): recipe_pb.Recipe;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRecipesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetRecipesResponse): GetRecipesResponse.AsObject;
  static serializeBinaryToWriter(message: GetRecipesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRecipesResponse;
  static deserializeBinaryFromReader(message: GetRecipesResponse, reader: jspb.BinaryReader): GetRecipesResponse;
}

export namespace GetRecipesResponse {
  export type AsObject = {
    recipesList: Array<recipe_pb.Recipe.AsObject>,
  }
}

export enum Search { 
  PUBLIC = 0,
  PRIVATE = 1,
  FAMILY = 2,
}
