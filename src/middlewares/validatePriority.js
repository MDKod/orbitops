const { PRIORITIES } = require('../constants/taskConstants');

const validatePriority = (req, res, next) => {
  const hasPriority = Object.prototype.hasOwnProperty.call(
    req.query,
    'priority'
  );

  if (!hasPriority) {
    return next();
  }

  const { priority } = req.query;

  if (
    typeof priority !== 'string' ||
    !PRIORITIES.includes(priority)
  ) {
    return res.status(400).json({
      success: false,
      message: `Invalid priority. Allowed values: ${PRIORITIES.join(', ')}`,
    });
  }

  next();
};

module.exports = validatePriority;