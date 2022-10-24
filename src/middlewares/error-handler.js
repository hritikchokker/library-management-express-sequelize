exports.errorHandler = (err, req, res, next) => {
  return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  // }
  // return res.status(500).send({
  //   errors: [{ message: "something went wrong", statusCode: 500 }],
  // });
};
