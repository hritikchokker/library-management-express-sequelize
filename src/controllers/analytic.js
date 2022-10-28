const { Op } = require("sequelize");
const { db } = require("../models");
const AuthorModel = db.author;
const GETALLAUTHORWITHKBOOKS = {
  URL: "/author-with-k-books/:count",
  METHOD: "GET",
  VALIDATIONS: [],
  handler: async (req, res, next) => {
    try {
      const { count } = req.params;
      const data = await AuthorModel.findAll({
        attributes: {
          include: [
            [
              db.sequelize.fn("COUNT", db.sequelize.col("books.id")),
              "bookCount",
            ],
          ],
        },
        // where: db.sequelize.where(
        //   db.sequelize.fn("COUNT", db.sequelize.col("books.id")),
        //   {
        //     [Op.eq]: count,
        //   }
        // ),
        include: [
          {
            model: db.book,
            as: "books",
            attributes: [],
          },
        ],
        group: ["author.id"],
        having: db.sequelize.where(db.sequelize.fn('COUNT',db.sequelize.col('books.id')),'=',count)
      });
      return res.status(200).json({
        data,
        message: "list fetched succesfully",
      });
    } catch (error) {
      return res.status(400).json({
        message: "something went wrong",
        error,
      });
    }
  },
};
module.exports = {
  GETALLAUTHORWITHKBOOKS,
};
