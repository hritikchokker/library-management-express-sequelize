import express from "express";
const router = express.Router();
import { CREATE_AUTHOR, DELETE_AUTHOR, GET_ALL_AUTHORS, GET_ONE_AUTHOR, UPDATE_ONE_AUTHOR } from "../controllers/author";
import { validateRequest } from "../middlewares/validate-request.middleware";
import { requireAuth } from "../middlewares/require-auth";
import { currentUser } from "../middlewares/current-user";
router.post(
  CREATE_AUTHOR.URL,
  CREATE_AUTHOR.VALIDATIONS,
  validateRequest,
  // currentUser,
  // requireAuth,
  CREATE_AUTHOR.handler
);
router.get(
  GET_ALL_AUTHORS.URL,
  GET_ALL_AUTHORS.VALIDATIONS,
  validateRequest,
  GET_ALL_AUTHORS.handler
);
router.get(
  GET_ONE_AUTHOR.URL,
  GET_ONE_AUTHOR.VALIDATIONS,
  validateRequest,
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
export default router;
