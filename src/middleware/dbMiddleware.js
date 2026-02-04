const dbConnect = require('../lib/dbConnect');

/**
 * Middleware to ensure database connection before handling requests
 */
const ensureDbConnection = async (req, res, next) => {
  try {
    await dbConnect();
    next();
  } catch (error) {
    console.error('Database connection middleware error:', error);
    res.status(503).json({
      success: false,
      message: 'Service temporarily unavailable',
      error: 'Database connection failed'
    });
  }
};

module.exports = ensureDbConnection;
