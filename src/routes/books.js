const express = require("express");
const router = express.Router();
const {
  CREATE_BOOK,
  DELETE_BOOK,
  GET_ALL_BOOKS,
  GET_ONE_BOOK,
  UPDATE_ONE_BOOK,
} = require("../controllers/book");
const {
  validateRequest,
} = require("../middlewares/validate-request.middleware");
const { requireAuth } = require("../middlewares/require-auth");
const { currentUser } = require("../middlewares/current-user");
router.post(
  CREATE_BOOK.URL,
  CREATE_BOOK.VALIDATIONS,
  validateRequest,
  currentUser,
  requireAuth,
  CREATE_BOOK.handler
);
router.get(
  GET_ALL_BOOKS.URL,
  GET_ALL_BOOKS.VALIDATIONS,
  validateRequest,
  currentUser,
  requireAuth,
  GET_ALL_BOOKS.handler
);
router.get(
  GET_ONE_BOOK.URL,
  GET_ONE_BOOK.VALIDATIONS,
  validateRequest,
  currentUser,
  requireAuth,
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
module.exports = router;
