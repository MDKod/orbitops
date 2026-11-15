
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.error({
    message: err.message,
    statusCode,
    endpoint: req.originalUrl,
    timestamp: new Date().toISOString(),
  });

  res.status(statusCode).json({
    success: false,
    message:
      statusCode >= 500
        ? "Internal Server Error"
        : err.message,
  });
};

module.exports = errorHandler;
