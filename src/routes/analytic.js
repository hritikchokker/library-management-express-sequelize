const express = require("express");
const router = express.Router();
const { GETALLAUTHORWITHKBOOKS } = require("../controllers/analytic");
const { currentUser } = require("../middlewares/current-user");
const { requireAuth } = require("../middlewares/require-auth");
const {
  validateRequest,
} = require("../middlewares/validate-request.middleware");
router.get(
  GETALLAUTHORWITHKBOOKS.URL,
  validateRequest,
  currentUser,
  requireAuth,
  GETALLAUTHORWITHKBOOKS.handler
);

module.exports = router;
