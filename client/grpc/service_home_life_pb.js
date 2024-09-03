// source: service_home_life.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof global !== 'undefined' && global) ||
    (typeof self !== 'undefined' && self) ||
    (function () { return this; }).call(null) ||
    Function('return this')();

var google_api_annotations_pb = require('./google/api/annotations_pb.js');
goog.object.extend(proto, google_api_annotations_pb);
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
goog.object.extend(proto, google_protobuf_empty_pb);
var rpc_create_user_pb = require('./rpc_create_user_pb.js');
goog.object.extend(proto, rpc_create_user_pb);
var rpc_verify_user_pb = require('./rpc_verify_user_pb.js');
goog.object.extend(proto, rpc_verify_user_pb);
var rpc_login_user_pb = require('./rpc_login_user_pb.js');
goog.object.extend(proto, rpc_login_user_pb);
var rpc_create_family_pb = require('./rpc_create_family_pb.js');
goog.object.extend(proto, rpc_create_family_pb);
var rpc_get_family_pb = require('./rpc_get_family_pb.js');
goog.object.extend(proto, rpc_get_family_pb);
var rpc_add_user_to_family_pb = require('./rpc_add_user_to_family_pb.js');
goog.object.extend(proto, rpc_add_user_to_family_pb);
var rpc_add_task_pb = require('./rpc_add_task_pb.js');
goog.object.extend(proto, rpc_add_task_pb);
var rpc_assign_task_pb = require('./rpc_assign_task_pb.js');
goog.object.extend(proto, rpc_assign_task_pb);
var rpc_mark_task_as_done_pb = require('./rpc_mark_task_as_done_pb.js');
goog.object.extend(proto, rpc_mark_task_as_done_pb);
var rpc_delete_task_pb = require('./rpc_delete_task_pb.js');
goog.object.extend(proto, rpc_delete_task_pb);
var rpc_get_tasks_pb = require('./rpc_get_tasks_pb.js');
goog.object.extend(proto, rpc_get_tasks_pb);
var rpc_create_recipe_pb = require('./rpc_create_recipe_pb.js');
goog.object.extend(proto, rpc_create_recipe_pb);
var rpc_update_recipe_pb = require('./rpc_update_recipe_pb.js');
goog.object.extend(proto, rpc_update_recipe_pb);
var rpc_get_recipes_pb = require('./rpc_get_recipes_pb.js');
goog.object.extend(proto, rpc_get_recipes_pb);
var rpc_delete_recipe_pb = require('./rpc_delete_recipe_pb.js');
goog.object.extend(proto, rpc_delete_recipe_pb);
var rpc_renew_access_token_pb = require('./rpc_renew_access_token_pb.js');
goog.object.extend(proto, rpc_renew_access_token_pb);
var protoc$gen$openapiv2_options_annotations_pb = require('./protoc-gen-openapiv2/options/annotations_pb.js');
goog.object.extend(proto, protoc$gen$openapiv2_options_annotations_pb);
var google_protobuf_descriptor_pb = require('google-protobuf/google/protobuf/descriptor_pb.js');
goog.object.extend(proto, google_protobuf_descriptor_pb);
goog.exportSymbol('proto.pb.permissionToken', null, global);

/**
 * A tuple of {field number, class constructor} for the extension
 * field named `permissionToken`.
 * @type {!jspb.ExtensionFieldInfo<string>}
 */
proto.pb.permissionToken = new jspb.ExtensionFieldInfo(
    50001,
    {permissionToken: 0},
    null,
     /** @type {?function((boolean|undefined),!jspb.Message=): !Object} */ (
         null),
    0);

google_protobuf_descriptor_pb.MethodOptions.extensionsBinary[50001] = new jspb.ExtensionFieldBinaryInfo(
    proto.pb.permissionToken,
    jspb.BinaryReader.prototype.readString,
    jspb.BinaryWriter.prototype.writeString,
    undefined,
    undefined,
    false);
// This registers the extension field with the extended class, so that
// toObject() will function correctly.
google_protobuf_descriptor_pb.MethodOptions.extensions[50001] = proto.pb.permissionToken;

goog.object.extend(exports, proto.pb);
