const express = require("express");
const router = express.Router();
const {
  CREATE_AUTHOR,
  DELETE_AUTHOR,
  GET_ALL_AUTHORS,
  GET_ONE_AUTHOR,
  UPDATE_ONE_AUTHOR,
} = require("../controllers/author");
const {
  validateRequest,
} = require("../middlewares/validate-request.middleware");
const { requireAuth } = require("../middlewares/require-auth");
const { currentUser } = require("../middlewares/current-user");
router.post(
  CREATE_AUTHOR.URL,
  CREATE_AUTHOR.VALIDATIONS,
  validateRequest,
  currentUser,
  requireAuth,
  CREATE_AUTHOR.handler
);
router.get(
  GET_ALL_AUTHORS.URL,
  GET_ALL_AUTHORS.VALIDATIONS,
  validateRequest,
  currentUser,
  requireAuth,
  GET_ALL_AUTHORS.handler
);
router.get(
  GET_ONE_AUTHOR.URL,
  GET_ONE_AUTHOR.VALIDATIONS,
  validateRequest,
  currentUser,
  requireAuth,
  GET_ONE_AUTHOR.handler
);
router.put(
  UPDATE_ONE_AUTHOR.URL,
  UPDATE_ONE_AUTHOR.VALIDATIONS,
  validateRequest,
  currentUser,
  requireAuth,
  UPDATE_ONE_AUTHOR.handler
);
router.patch(
  UPDATE_ONE_AUTHOR.URL,
  UPDATE_ONE_AUTHOR.VALIDATIONS,
  validateRequest,
  currentUser,
  requireAuth,
  UPDATE_ONE_AUTHOR.handler
);
router.delete(
  DELETE_AUTHOR.URL,
  DELETE_AUTHOR.VALIDATIONS,
  validateRequest,
  currentUser,
  requireAuth,
  DELETE_AUTHOR.handler
);
module.exports = router;
