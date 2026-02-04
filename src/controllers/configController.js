const GeneralConfig = require('../models/GeneralConfig');

/**
 * @desc    Get general config
 * @route   GET /api/config
 * @access  Public
 */
exports.getConfig = async (req, res, next) => {
  try {
    let config = await GeneralConfig.findOne();

    // If no config exists, create a default one
    if (!config) {
      config = await GeneralConfig.create({});
    }

    res.status(200).json({
      success: true,
      data: config,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/**
 * @desc    Update general config
 * @route   PUT /api/config
 * @access  Private/Admin
 */
exports.updateConfig = async (req, res, next) => {
  try {
    let config = await GeneralConfig.findOne();

    // If no config exists, create one
    if (!config) {
      config = await GeneralConfig.create(req.body);
    } else {
      // Update existing config with merge strategy
      config = await GeneralConfig.findByIdAndUpdate(config._id, req.body, {
        new: true,
        runValidators: true,
      });
    }

    res.status(200).json({
      success: true,
      data: config,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/**
 * @desc    Update site statistics
 * @route   PATCH /api/config/stats
 * @access  Private/Admin
 */
exports.updateStats = async (req, res, next) => {
  try {
    let config = await GeneralConfig.findOne();

    if (!config) {
      config = await GeneralConfig.create({
        stats: req.body.stats || {},
      });
    } else {
      config.stats = {
        ...config.stats,
        ...req.body.stats,
      };
      config = await config.save();
    }

    res.status(200).json({
      success: true,
      data: config,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/**
 * @desc    Increment visitor count
 * @route   PATCH /api/config/visitors
 * @access  Public
 */
exports.incrementVisitors = async (req, res, next) => {
  try {
    let config = await GeneralConfig.findOne();

    if (!config) {
      config = await GeneralConfig.create({
        stats: { visitors: 1 },
      });
    } else {
      config.stats.visitors = (config.stats.visitors || 0) + 1;
      config = await config.save();
    }

    res.status(200).json({
      success: true,
      data: config,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
