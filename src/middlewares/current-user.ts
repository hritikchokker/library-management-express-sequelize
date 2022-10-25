import { decode } from "../utils/tokenmanager";
import { BadRequestError } from "../errors/bad-request-error";
export const currentUser = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return next(
        new BadRequestError({
          statusCode: 401,
          message: "invalid request token is missing",
        })
      );
    }
    const user = decode(req.headers.authorization);
    req.currentUser = user;
    next();
  } catch (err) {
    return next(
      new BadRequestError({
        statusCode: 400,
        message: "invalid token",
      })
    );
  }
};
