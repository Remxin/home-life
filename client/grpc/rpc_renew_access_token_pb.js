// source: rpc_renew_access_token.proto
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

var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
goog.object.extend(proto, google_protobuf_timestamp_pb);
goog.exportSymbol('proto.pb.RenewAccessTokenResponse', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.RenewAccessTokenResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pb.RenewAccessTokenResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.RenewAccessTokenResponse.displayName = 'proto.pb.RenewAccessTokenResponse';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.RenewAccessTokenResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.RenewAccessTokenResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.RenewAccessTokenResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.RenewAccessTokenResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessiondId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    accessToken: jspb.Message.getFieldWithDefault(msg, 2, ""),
    refreshToken: jspb.Message.getFieldWithDefault(msg, 3, ""),
    accessTokenExpiresAt: (f = msg.getAccessTokenExpiresAt()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
    refreshTokenExpiresAt: (f = msg.getRefreshTokenExpiresAt()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
    permissionToken: jspb.Message.getFieldWithDefault(msg, 6, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.RenewAccessTokenResponse}
 */
proto.pb.RenewAccessTokenResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.RenewAccessTokenResponse;
  return proto.pb.RenewAccessTokenResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.RenewAccessTokenResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.RenewAccessTokenResponse}
 */
proto.pb.RenewAccessTokenResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessiondId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setAccessToken(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setRefreshToken(value);
      break;
    case 4:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setAccessTokenExpiresAt(value);
      break;
    case 5:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setRefreshTokenExpiresAt(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setPermissionToken(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.RenewAccessTokenResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.RenewAccessTokenResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.RenewAccessTokenResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.RenewAccessTokenResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessiondId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getAccessToken();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getRefreshToken();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getAccessTokenExpiresAt();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = message.getRefreshTokenExpiresAt();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 6));
  if (f != null) {
    writer.writeString(
      6,
      f
    );
  }
};


/**
 * optional string sessiond_id = 1;
 * @return {string}
 */
proto.pb.RenewAccessTokenResponse.prototype.getSessiondId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.pb.RenewAccessTokenResponse} returns this
 */
proto.pb.RenewAccessTokenResponse.prototype.setSessiondId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string access_token = 2;
 * @return {string}
 */
proto.pb.RenewAccessTokenResponse.prototype.getAccessToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.pb.RenewAccessTokenResponse} returns this
 */
proto.pb.RenewAccessTokenResponse.prototype.setAccessToken = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string refresh_token = 3;
 * @return {string}
 */
proto.pb.RenewAccessTokenResponse.prototype.getRefreshToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.pb.RenewAccessTokenResponse} returns this
 */
proto.pb.RenewAccessTokenResponse.prototype.setRefreshToken = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional google.protobuf.Timestamp access_token_expires_at = 4;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.pb.RenewAccessTokenResponse.prototype.getAccessTokenExpiresAt = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 4));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.pb.RenewAccessTokenResponse} returns this
*/
proto.pb.RenewAccessTokenResponse.prototype.setAccessTokenExpiresAt = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.pb.RenewAccessTokenResponse} returns this
 */
proto.pb.RenewAccessTokenResponse.prototype.clearAccessTokenExpiresAt = function() {
  return this.setAccessTokenExpiresAt(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.RenewAccessTokenResponse.prototype.hasAccessTokenExpiresAt = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional google.protobuf.Timestamp refresh_token_expires_at = 5;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.pb.RenewAccessTokenResponse.prototype.getRefreshTokenExpiresAt = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 5));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.pb.RenewAccessTokenResponse} returns this
*/
proto.pb.RenewAccessTokenResponse.prototype.setRefreshTokenExpiresAt = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.pb.RenewAccessTokenResponse} returns this
 */
proto.pb.RenewAccessTokenResponse.prototype.clearRefreshTokenExpiresAt = function() {
  return this.setRefreshTokenExpiresAt(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.RenewAccessTokenResponse.prototype.hasRefreshTokenExpiresAt = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional string permission_token = 6;
 * @return {string}
 */
proto.pb.RenewAccessTokenResponse.prototype.getPermissionToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.pb.RenewAccessTokenResponse} returns this
 */
proto.pb.RenewAccessTokenResponse.prototype.setPermissionToken = function(value) {
  return jspb.Message.setField(this, 6, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.pb.RenewAccessTokenResponse} returns this
 */
proto.pb.RenewAccessTokenResponse.prototype.clearPermissionToken = function() {
  return jspb.Message.setField(this, 6, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.RenewAccessTokenResponse.prototype.hasPermissionToken = function() {
  return jspb.Message.getField(this, 6) != null;
};


goog.object.extend(exports, proto.pb);