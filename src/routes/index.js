const express = require("express");
const router = express.Router();
const bookRouter = require("./books");
const authorRouter = require("./author");
const notfoundRouter = require("./notfound");
router.use("/book", bookRouter);
router.use("/author", authorRouter);
router.all("*", notfoundRouter);
/* GET home page. */


module.exports = router;
