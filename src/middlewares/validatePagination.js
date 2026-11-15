const {
  DEFAULT_PAGE,
  DEFAULT_LIMIT,
  MAX_LIMIT,
} = require('../constants/taskConstants');

const validatePagination = (req, res, next) => {
  const hasPage = Object.prototype.hasOwnProperty.call(
    req.query,
    'page'
  );

  const hasLimit = Object.prototype.hasOwnProperty.call(
    req.query,
    'limit'
  );

  const { page, limit } = req.query;

  const isValidInteger = (value) => {
    return (
      typeof value === 'string' &&
      /^\d+$/.test(value) &&
      Number.isSafeInteger(Number(value))
    );
  };

  if (
    (hasPage && (!isValidInteger(page) || Number(page) < 1)) ||
    (hasLimit &&
      (!isValidInteger(limit) ||
        Number(limit) < 1 ||
        Number(limit) > MAX_LIMIT))
  ) {
    return res.status(400).json({
      success: false,
      message: `Invalid pagination parameters. Page must be a positive integer and limit must be between 1 and ${MAX_LIMIT}.`,
    });
  }

  req.pagination = {
    page: hasPage ? Number(page) : DEFAULT_PAGE,
    limit: hasLimit ? Number(limit) : DEFAULT_LIMIT,
  };

  next();
};

module.exports = validatePagination;