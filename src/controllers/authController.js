const Admin = require('../models/Admin');

// @desc    Register admin
// @route   POST /api/auth/register
// @access  Public (Should be restricted in production)
exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const admin = await Admin.create({
      username,
      email,
      password,
    });

    sendTokenResponse(admin, 200, res);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide an email and password' });
    }

    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    sendTokenResponse(admin, 200, res);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (admin, statusCode, res) => {
  const token = admin.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true,
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
};
