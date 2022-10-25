import express from "express";
const router = express.Router();
import { NotFoundError } from "../errors/not-found-error";
router.all("*", (req, res, next) => {
  next(
    new NotFoundError({
      statusCode: 404,
      message: "route not found",
    })
  );
});

export default router;
