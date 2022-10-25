import express from "express";
const router = express.Router();
import bookRouter from "./books";
import authorRouter from "./author";
import notfoundRouter from "./notfound";
router.use("/book", bookRouter);
router.use("/author", authorRouter);
router.all("*", notfoundRouter);
/* GET home page. */


export default router;
