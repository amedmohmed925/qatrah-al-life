const News = require('../models/News');

/**
 * @desc    Get all news
 * @route   GET /api/news
 * @access  Public
 */
exports.getNews = async (req, res, next) => {
  try {
    const news = await News.find().sort({ date: -1 });
    res.status(200).json({
      success: true,
      count: news.length,
      data: news,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/**
 * @desc    Get single news article
 * @route   GET /api/news/:id
 * @access  Public
 */
exports.getNewsById = async (req, res, next) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ success: false, error: 'News article not found' });
    }
    res.status(200).json({
      success: true,
      data: news,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/**
 * @desc    Create news article
 * @route   POST /api/news
 * @access  Private/Admin
 */
exports.createNews = async (req, res, next) => {
  try {
    // Handle file upload if image was provided
    if (req.file) {
      req.body.image = `/uploads/${req.file.filename}`;
    }

    const news = await News.create(req.body);
    res.status(201).json({
      success: true,
      data: news,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/**
 * @desc    Update news article
 * @route   PUT /api/news/:id
 * @access  Private/Admin
 */
exports.updateNews = async (req, res, next) => {
  try {
    let news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ success: false, error: 'News article not found' });
    }

    // Handle file upload if image was provided
    if (req.file) {
      req.body.image = `/uploads/${req.file.filename}`;
    }

    news = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: news,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/**
 * @desc    Delete news article
 * @route   DELETE /api/news/:id
 * @access  Private/Admin
 */
exports.deleteNews = async (req, res, next) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) {
      return res.status(404).json({ success: false, error: 'News article not found' });
    }
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
