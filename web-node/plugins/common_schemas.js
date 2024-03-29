"use strict";

const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts, done) {
  fastify.addSchema({
    $id: "short_ascii_string",
    type: "string",
    maxLength: 32,
    pattern: "^[ -~]{1,32}$",
  });

  fastify.addSchema({
    $id: "short_nullable_ascii_string",
    nullable: true,
    type: "string",
    maxLength: 32,
    pattern: "^[ -~]{1,32}$",
  });

  fastify.addSchema({
    $id: "password",
    type: "string",
    maxLength: 32,
    minLength: 1,
  });

  fastify.addSchema({
    $id: "short_identifiable_string",
    type: "string",
    maxLength: 32,
    pattern: "^[a-zA-Z0-9_-]{3,32}$",
  });

  fastify.addSchema({
    $id: "long_string",
    type: "string",
    maxLength: 4096,
  });

  fastify.addSchema({
    $id: "board_path_params",
    type: "object",
    required: ["path"],
    properties: {
      path: { $ref: "short_identifiable_string" },
    },
  });

  fastify.addSchema({
    $id: "limited_quotes_params",
    type: "object",
    required: ["path", "page", "size"],
    properties: {
      path: { $ref: "short_identifiable_string" },
      page: { $ref: "positive_int" },
      size: {
        type: "integer",
        minimum: 1,
      }
    },
  });

  fastify.addSchema({
    $id: "board_path_user_params",
    type: "object",
    required: ["path", "uname"],
    properties: {
      path: { $ref: "short_identifiable_string" },
      uname: { $ref: "short_identifiable_string" },
    },
  });

  fastify.addSchema({
    $id: "board_path_quote_params",
    type: "object",
    required: ["path", "id"],
    properties: {
      path: { $ref: "short_identifiable_string" },
      id: { type: "integer", minimum: 0 },
    },
  });

  fastify.addSchema({
    $id: "owned_board_array_info",
    type: "array",
    items: {
      type: "object",
      required: ["path", "title"],
      properties: {
        path: { $ref: "short_identifiable_string" },
        title: { $ref: "short_ascii_string" },
        users: { $ref: "positive_int" },
        last_updated: { $ref: "short_nullable_ascii_string" },
      },
    },
  });

  fastify.addSchema({
    $id: "public_board_array_info",
    type: "array",
    items: {
      type: "object",
      required: ["path", "title", "owner"],
      properties: {
        path: { $ref: "short_identifiable_string" },
        title: { $ref: "short_ascii_string" },
        owner: { $ref: "short_identifiable_string" },
        last_updated: { $ref: "short_nullable_ascii_string" },
      },
    },
  });

  fastify.addSchema({
    $id: "subscribed_board_array_info",
    type: "array",
    items: {
      type: "object",
      required: ["path", "title", "owner", "access_lvl"],
      properties: {
        path: { $ref: "short_identifiable_string" },
        title: { $ref: "short_ascii_string" },
        owner: { $ref: "short_identifiable_string" },
        access_lvl: { $ref: "access_lvl" },
        users: { $ref: "positive_int" },
        last_updated: { $ref: "short_nullable_ascii_string" },
      },
    },
  });

  fastify.addSchema({
    $id: "access_lvl",
    type: "integer",
    minimum: 0,
    maximum: 2,
  });

  fastify.addSchema({
    $id: "positive_int",
    type: "integer",
    minimum: 0,
  });

  fastify.addSchema({
    additionalProperties: false,
    $id: "quote",
    type: "object",
    required: ["phrases"],
    properties: {
      phrases: {
        type: "array",
        minItems: 1,
        items: {
          additionalProperties: false,
          type: "object",
          required: ["msg"],
          properties: {
            msg: { $ref: "long_string" },
            by: { $ref: "short_ascii_string" },
            ctx: { $ref: "long_string" },
          },
          maxProperties: 3,
        },
      },
      ctx: { $ref: "long_string" },
      date: { $ref: "positive_int" },
    },
  });
});
