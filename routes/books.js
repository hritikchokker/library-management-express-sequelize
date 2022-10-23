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

router.post(
  CREATE_BOOK.URL,
  CREATE_BOOK.VALIDATIONS,
  validateRequest,
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
  UPDATE_ONE_BOOK.handler
);
router.patch(
  UPDATE_ONE_BOOK.URL,
  UPDATE_ONE_BOOK.VALIDATIONS,
  validateRequest,
  UPDATE_ONE_BOOK.handler
);
router.delete(
  DELETE_BOOK.URL,
  DELETE_BOOK.VALIDATIONS,
  validateRequest,
  DELETE_BOOK.handler
);
module.exports = router;
