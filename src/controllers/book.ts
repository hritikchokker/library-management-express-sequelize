import { body } from "express-validator";
import { Op } from "sequelize";
import { randomUUID } from "crypto";
import { db } from "../models";
const Book = db.book;
const Author = db.author;
import { BadRequestError } from "../errors/bad-request-error";
import { NotFoundError } from "../errors/not-found-error";
export const CREATE_BOOK = {
  URL: "/",
  METHOD: "POST",
  VALIDATIONS: [body("name").notEmpty(), body("description").notEmpty()],
  handler: async (req, res, next) => {
    try {
      const { name, description, authorId } = req.body;
      console.log(authorId,'authorid');
      // @ts-ignore
      const previousBook = await Book.findOne({
        where: {
          [Op.or]: {
            name,
            description,
          },
        },
      });
      if (previousBook) {
        return next(
          new BadRequestError({
            message: "book already exists please create new",
            statusCode: 400,
          })
        );
      }
      // @ts-ignore
      const author = await Author.findOne({
        where: { id: authorId },
      });
      if (!author) {
        return next(
          new NotFoundError({
            message: "no author found for this id",
            statusCode: 400,
          })
        );
      }

      // @ts-ignore
      const bookDetails = Book.build({
        id: randomUUID(),
        name,
        description,
        authorId,
      });
      await bookDetails.save();
      res.status(201).json({
        message: "book created success",
        details: bookDetails,
      });
    } catch (error) {
      console.log(error, "erroor");
    }
  },
};

export const GET_ALL_BOOKS = {
  URL: "/",
  METHOD: "GET",
  VALIDATIONS: [],
  handler: async (req, res) => {
    try {
      // @ts-ignore
      const booksList = await Book.findAll();

      return res.status(200).json({
        message: "books list fetched",
        data: booksList,
      });
    } catch (error) {
      console.log(error, "errorr");
      return res.status(400).json({
        error,
      });
    }
  },
};

export const GET_ONE_BOOK = {
  URL: "/:id",
  METHOD: "GET",
  VALIDATIONS: [],
  handler: async (req, res) => {
    try {
      if (!req.params.id) {
        throw new BadRequestError("invalid request no param found");
      }
      // @ts-ignore
      const bookDetails = await Book.findOne({ where: { id: req.params.id } });
      return res.status(200).json({
        message: "book fetched",
        details: bookDetails,
      });
    } catch (error) {
      console.log(error, "err");
      return res.status(400).json({
        error,
      });
    }
  },
};

export const UPDATE_ONE_BOOK = {
  URL: "/:id",
  METHOD: "PATCH",
  VALIDATIONS: [body("name").notEmpty(), body("description").notEmpty()],
  handler: async (req, res) => {},
};

export const DELETE_BOOK = {
  URL: "/:id",
  METHOD: "DELETE",
  VALIDATIONS: [],
  handler: async (req, res) => {},
};
