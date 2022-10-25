import { body } from "express-validator";
import { Op } from "sequelize";
import { randomUUID } from "crypto";
import { db } from "../models";
const Book = db.book;
const Author = db.author;
import { BadRequestError } from "../errors/bad-request-error";
export const CREATE_AUTHOR = {
  URL: "/",
  METHOD: "POST",
  VALIDATIONS: [body("name").notEmpty(), body("description").notEmpty()],
  handler: async (req, res, next) => {
    try {
      const { name, description } = req.body;
      // @ts-ignore
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
      // @ts-ignore
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
    } catch (error) { }
  },
};

export const GET_ALL_AUTHORS = {
  URL: "/",
  METHOD: "GET",
  VALIDATIONS: [],
  handler: async (req, res) => {
    try {
      // @ts-ignore
      const authorList = await Author.findAll({
        include: ['books'],
      });
      return res.status(200).json({
        message: "authors list fetched",
        data: authorList,
      });
    } catch (error) {
      console.log(error)
      return res.status(400).json({
        error,
      });
    }
  },
};

export const GET_ONE_AUTHOR = {
  URL: "/:id",
  METHOD: "GET",
  VALIDATIONS: [],
  handler: async (req, res) => {
    try {
      // @ts-ignore
      const authorDetails = await Author.findOne({
        where: { id: req.params.id },
      });
      return res.status(200).json({
        message: "book fetched",
        details: authorDetails,
      });
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
  },
};

export const UPDATE_ONE_AUTHOR = {
  URL: "/:id",
  METHOD: "PATCH",
  VALIDATIONS: [body("name").notEmpty(), body("description").notEmpty()],
  handler: async (req, res) => { },
};

export const DELETE_AUTHOR = {
  URL: "/:id",
  METHOD: "DELETE",
  VALIDATIONS: [],
  handler: async (req, res) => { },
};
