import { NotFoundError } from "../errors/not-found-error";
export const requireAuth = (req, res, next) => {
  if (!req.currentUser) {
    next(
      new NotFoundError({
        message: "token expired please login again",
        statusCode: 401,
      })
    );
  }
  next();
};
