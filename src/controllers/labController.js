const LabPage = require('../models/LabPage');

/**
 * @desc    Get all labs
 * @route   GET /api/labs
 * @access  Public
 */
exports.getLabs = async (req, res, next) => {
  try {
    const labs = await LabPage.find();
    res.status(200).json({
      success: true,
      count: labs.length,
      data: labs,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/**
 * @desc    Get lab by type
 * @route   GET /api/labs/:type
 * @access  Public
 */
exports.getLabByType = async (req, res, next) => {
  try {
    const lab = await LabPage.findOne({ type: req.params.type });
    if (!lab) {
      return res.status(404).json({ success: false, error: 'Lab not found' });
    }
    res.status(200).json({
      success: true,
      data: lab,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/**
 * @desc    Update lab
 * @route   PUT /api/labs/:type
 * @access  Private/Admin
 */
exports.updateLab = async (req, res, next) => {
  try {
    let lab = await LabPage.findOne({ type: req.params.type });
    if (!lab) {
      return res.status(404).json({ success: false, error: 'Lab not found' });
    }

    // Handle file upload if image was provided
    if (req.file) {
      req.body.image = `/uploads/${req.file.filename}`;
    }

    lab = await LabPage.findOneAndUpdate(
      { type: req.params.type },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: lab,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
