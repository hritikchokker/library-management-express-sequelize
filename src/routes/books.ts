import express from "express";
const router = express.Router();
import { CREATE_BOOK, DELETE_BOOK, GET_ALL_BOOKS, GET_ONE_BOOK, UPDATE_ONE_BOOK } from "../controllers/book";
import { validateRequest } from "../middlewares/validate-request.middleware";
import { requireAuth } from "../middlewares/require-auth";
import { currentUser } from "../middlewares/current-user";
router.post(
  CREATE_BOOK.URL,
  CREATE_BOOK.VALIDATIONS,
  validateRequest,
  // currentUser,
  // requireAuth,
  CREATE_BOOK.handler
);
router.get(
  GET_ALL_BOOKS.URL,
  GET_ALL_BOOKS.VALIDATIONS,
  validateRequest,
  GET_ALL_BOOKS.handler
);
router.get(
  GET_ONE_BOOK.URL,
  GET_ONE_BOOK.VALIDATIONS,
  validateRequest,
  GET_ONE_BOOK.handler
);
router.put(
  UPDATE_ONE_BOOK.URL,
  UPDATE_ONE_BOOK.VALIDATIONS,
  validateRequest,
  currentUser,
  requireAuth,
  UPDATE_ONE_BOOK.handler
);
router.patch(
  UPDATE_ONE_BOOK.URL,
  UPDATE_ONE_BOOK.VALIDATIONS,
  validateRequest,
  currentUser,
  requireAuth,
  UPDATE_ONE_BOOK.handler
);
router.delete(
  DELETE_BOOK.URL,
  DELETE_BOOK.VALIDATIONS,
  validateRequest,
  currentUser,
  requireAuth,
  DELETE_BOOK.handler
);
export default  router;
