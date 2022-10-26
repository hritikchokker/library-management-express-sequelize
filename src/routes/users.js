const express = require("express");
const router = express.Router();
const { REGISTER_USER, LOGIN, LOGOUT } = require("../controllers/user");
const { currentUser } = require("../middlewares/current-user");
const { requireAuth } = require("../middlewares/require-auth");
const {
  validateRequest,
} = require("../middlewares/validate-request.middleware");
/* GET users listing. */
router.post(
  REGISTER_USER.URL,
  REGISTER_USER.VALIDATIONS,
  validateRequest,
  REGISTER_USER.handler
);

router.post(
  LOGOUT.URL,
  LOGOUT.VALIDATIONS,
  validateRequest,
  currentUser,
  requireAuth,
  LOGOUT.handler
);

router.post(LOGIN.URL, LOGIN.VALIDATIONS, validateRequest, LOGIN.handler);

module.exports = router;
