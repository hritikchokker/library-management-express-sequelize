const express = require("express");
const router = express.Router();
const { NotFoundError } = require("../errors/not-found-error");
router.all("*", (req, res, next) => {
  next(
    new NotFoundError({
      statusCode: 404,
      message: "route not found",
    })
  );
});

module.exports = router;
