const { body } = require("express-validator");
const { Op } = require("sequelize");
const { randomUUID } = require("crypto");
const { db } = require("../models");
const Book = db.book;
exports.CREATE_BOOK = {
  URL: "/",
  METHOD: "POST",
  VALIDATIONS: [body("name").notEmpty(), body("description").notEmpty()],
  handler: async (req, res) => {
    try {
      const { name, description } = req.body;
      const previousBook = await Book.findOne({
        where: {
          [Op.or]: {
            name,
            description,
          },
        },
      });
      if (previousBook) {
        return res.status(400).json({
          message: "book already exists please create new",
        });
      }
      const bookDetails = Book.build({
        id: randomUUID(),
        name,
        description,
      });
      await bookDetails.save();
      res.status(201).json({
        message: "book created success",
        details: bookDetails,
      });
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
  },
};

exports.GET_ALL_BOOKS = {
  URL: "/",
  METHOD: "GET",
  VALIDATIONS: [],
  handler: async (req, res) => {
    try {
      const booksList = await Book.findAll();

      return res.status(200).json({
        message: "books list fetched",
        data: booksList,
      });
    } catch (error) {
      console.log(error,'errorr');
      return res.status(400).json({
        error,
      });
    }
  },
};

exports.GET_ONE_BOOK = {
  URL: "/:id",
  METHOD: "GET",
  VALIDATIONS: [],
  handler: async (req, res) => {},
};

exports.UPDATE_ONE_BOOK = {
  URL: "/:id",
  METHOD: "PATCH",
  VALIDATIONS: [body("name").notEmpty(), body("description").notEmpty()],
  handler: async (req, res) => {},
};

exports.DELETE_BOOK = {
  URL: "/:id",
  METHOD: "DELETE",
  VALIDATIONS: [],
  handler: async (req, res) => {},
};
