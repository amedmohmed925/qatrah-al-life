const express = require('express');
const {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} = require('../controllers/newsController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     News:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         title:
 *           type: object
 *           properties:
 *             ar:
 *               type: string
 *             en:
 *               type: string
 *         content:
 *           type: object
 *           properties:
 *             ar:
 *               type: string
 *             en:
 *               type: string
 *         image:
 *           type: string
 *           description: Image URL
 *         date:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: Get all news articles (sorted by date, newest first)
 *     tags: [News]
 *     responses:
 *       200:
 *         description: List of all news articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/News'
 *   post:
 *     summary: Create a new news article (Admin only)
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: object
 *               content:
 *                 type: object
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: News article created successfully
 */

/**
 * @swagger
 * /api/news/{id}:
 *   get:
 *     summary: Get a specific news article
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: News article ID
 *     responses:
 *       200:
 *         description: News article details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       404:
 *         description: News article not found
 *   put:
 *     summary: Update news article (Admin only)
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: News article ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: object
 *               content:
 *                 type: object
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: News article updated successfully
 *       404:
 *         description: News article not found
 *   delete:
 *     summary: Delete news article (Admin only)
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: News article ID
 *     responses:
 *       200:
 *         description: News article deleted successfully
 *       404:
 *         description: News article not found
 */

router.route('/')
  .get(getNews)
  .post(protect, upload.single('image'), createNews);

router.route('/:id')
  .get(getNewsById)
  .put(protect, upload.single('image'), updateNews)
  .delete(protect, deleteNews);

module.exports = router;
