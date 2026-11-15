
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const startTime = Date.now();

  res.on("finish", () => {
    const responseTime = Date.now() - startTime;

    console.log({
      method: req.method,
      endpoint: req.originalUrl,
      statusCode: res.statusCode,
      responseTime: `${responseTime}ms`,
      timestamp,
    });
  });

  next();
};

module.exports = logger;
