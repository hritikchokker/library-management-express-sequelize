const { body } = require("express-validator");
const { Op } = require("sequelize");
const { randomUUID } = require("crypto");
const { db } = require("../models");
const Book = db.book;
const Author = db.author;
const { BadRequestError } = require("../errors/bad-request-error");
const { NotFoundError } = require("../errors/not-found-error");
exports.CREATE_AUTHOR = {
  URL: "/",
  METHOD: "POST",
  VALIDATIONS: [body("name").notEmpty(), body("description").notEmpty()],
  handler: async (req, res, next) => {
    try {
      const { name, description } = req.body;

      const previousAuthor = await Author.findOne({
        where: {
          [Op.or]: {
            name,
            description,
          },
        },
      });
      if (previousAuthor) {
        return next(
          new BadRequestError({
            message: "author already exists please create new",
            statusCode: 400,
          })
        );
      }
      const authorDetails = Author.build({
        id: randomUUID(),
        name,
        description,
      });
      await authorDetails.save();
      res.status(201).json({
        message: "author created success",
        details: authorDetails,
      });
    } catch (error) {}
  },
};

exports.GET_ALL_AUTHORS = {
  URL: "/",
  METHOD: "GET",
  VALIDATIONS: [],
  handler: async (req, res) => {
    try {
      const authorList = await Author.findAll({
        include: ["books"],
      });
      return res.status(200).json({
        message: "authors list fetched",
        data: authorList,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error,
      });
    }
  },
};

exports.GET_ONE_AUTHOR = {
  URL: "/:id",
  METHOD: "GET",
  VALIDATIONS: [],
  handler: async (req, res) => {
    try {
      const authorDetails = await Author.findOne({
        where: { id: req.params.id },
      });
      return res.status(200).json({
        message: "author details fetched",
        details: authorDetails,
      });
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
  },
};

exports.UPDATE_ONE_AUTHOR = {
  URL: "/:id",
  METHOD: "PATCH",
  VALIDATIONS: [body("name").notEmpty(), body("description").notEmpty()],
  handler: async (req, res) => {},
};

exports.DELETE_AUTHOR = {
  URL: "/:id",
  METHOD: "DELETE",
  VALIDATIONS: [],
  handler: async (req, res) => {
    try {
      if (!req.params.id) {
        return next(
          new BadRequestError({
            message: "bad request, no author id passed to the request",
            statusCode: 400,
          })
        );
      }
      const authorDetails = await Author.findOne({
        where: { id: req.params.id },
      });

      if (!authorDetails) {
        return next(
          new NotFoundError({
            message: "no author found with this id",
            statusCode: 400,
          })
        );
      }
      await authorDetails.destroy();
      return res.status(200).json({
        message: "author deleted successfully",
        statusCode: 200,
      });
    } catch (error) {}
  },
};
