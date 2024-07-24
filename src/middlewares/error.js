const errorHandler = (err, req, res, next) => {
  console.error(`Some error occurred: ${err}`);
  return res.status(err.statusCode).json({
    message: err.message
  });
};

module.exports = errorHandler;
