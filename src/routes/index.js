const express = require("express");
const router = express.Router();
const bookRouter = require("./books");
const userRouter = require("./users");
const authorRouter = require("./author");
const analyticRouter = require("./analytic");
const notfoundRouter = require("./notfound");
router.use("/book", bookRouter);
router.use("/author", authorRouter);
router.use("/user", userRouter);
router.use("/analytic", analyticRouter);
router.all("*", notfoundRouter);
/* GET home page. */

module.exports = router;
