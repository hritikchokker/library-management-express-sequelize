const { body } = require("express-validator");
const { randomUUID } = require("crypto");
const { Op } = require("sequelize");
const { BadRequestError } = require("../errors/bad-request-error");
const {
  RequestValidationError,
} = require("../errors/request-validation-errors");
const { db } = require("../models");
const { toHash, compare } = require("../utils/hashmanager");
const { createToken } = require("../utils/tokenmanager");
const { fetchDateFromString } = require("../utils/common");
const env = require("../config/env");
const UserModel = db.user;
const SessionModel = db.session;
const REGISTER_USER = {
  URL: "/register",
  METHOD: "POST",
  VALIDATIONS: [
    body("name").notEmpty(),
    body("email").notEmpty().isEmail(),
    body("password").notEmpty().isLength({ min: 4, max: 50 }),
  ],
  handler: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const existedUser = await UserModel.findOne({
        where: {
          name,
          email,
        },
      });
      if (existedUser) {
        return next(
          new BadRequestError({
            message: "user already exists",
            statusCode: 400,
          })
        );
      }
      const user = UserModel.build({
        name,
        id: randomUUID(),
        email,
        password,
      });
      user.password = await toHash(password);
      await user.save();
      const session = SessionModel.build({
        id: randomUUID(),
        userId: user.id,
        isActive: true,
        expiresIn: fetchDateFromString("m", 4),
      });
      await session.save();
      const token = createToken(
        {
          sessionId: session.id,
          userId: session.userId,
        },
        { expiresIn: "4m" }
      );
      return res.status(201).json({
        session,
        user,
        token,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

const LOGIN = {
  URL: "/login",
  METHOD: "POST",
  VALIDATIONS: [
    body("email").notEmpty().isEmail(),
    body("password").notEmpty(),
  ],
  handler: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const userDetails = await UserModel.findOne({ where: { email } });
      if (!userDetails) {
        return next(
          new BadRequestError({
            message: "no user found with this email",
            statusCode: 400,
          })
        );
      }
      const session = await SessionModel.findOne(
        {
          where: {
            userId: userDetails.id,
            expiresIn: {
              [Op.gte]: Date.now(),
            },
          },
        },
        {
          include: [UserModel],
        }
      );
      if (session && !env.SUPPORT_MULTI_LOGIN) {
        // await session.destroy();
        return next(
          new BadRequestError({
            message: "user already loggedIn",
            statusCode: 400,
          })
        );
      }
      if (!compare(userDetails.password, password)) {
        return next(
          new RequestValidationError({
            message: "password or email is invalid",
            statusCode: 400,
          })
        );
      }
      const newSession = SessionModel.build({
        id: randomUUID(),
        isActive: true,
        userId: userDetails.id,
        expiresIn: fetchDateFromString("m", 4),
      });
      await newSession.save();
      const token = createToken(
        { userId: userDetails.id, sessionId: newSession.id },
        { expiresIn: "4m" }
      );
      return res.status(200).json({
        message: "login success",
        token,
      });
    } catch (error) {
      console.log(error, "err");
    }
  },
};

const LOGOUT = {
  URL: "/logout",
  METHOD: "POST",
  VALIDATIONS: [],
  handler: async (req, res, next) => {
    try {
      const { sessionId, userId } = req.currentUser;
      if (!sessionId) {
        return next(
          new BadRequestError({
            message: "invalid request user is already loggedout",
            statusCode: 400,
          })
        );
      }
      await SessionModel.destroy({
        where: { id: sessionId, userId },
      });
      return res.status(200).json({
        message: "logout success",
        statusCode: 200,
      });
    } catch (error) {
      console.log(error, "err");
    }
  },
};

module.exports = {
  REGISTER_USER,
  LOGIN,
  LOGOUT,
};
