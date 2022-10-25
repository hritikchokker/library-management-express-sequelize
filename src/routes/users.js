const express = require("express");
const router = express.Router();
const { REGISTER_USER, LOGIN } = require("../controllers/user");
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

router.post(LOGIN.URL, LOGIN.VALIDATIONS, validateRequest, LOGIN.handler);

module.exports = router;
