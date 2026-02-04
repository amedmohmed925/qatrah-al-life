const express = require('express');
const {
  getLabs,
  getLabByType,
  updateLab,
} = require('../controllers/labController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     LabPage:
 *       type: object
 *       required:
 *         - type
 *         - title
 *         - description
 *       properties:
 *         type:
 *           type: string
 *           enum: [organic, inorganic, microbiology]
 *           description: Lab type (unique)
 *         title:
 *           type: object
 *           properties:
 *             ar:
 *               type: string
 *             en:
 *               type: string
 *         description:
 *           type: object
 *           properties:
 *             ar:
 *               type: string
 *             en:
 *               type: string
 *         features:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               ar:
 *                 type: string
 *               en:
 *                 type: string
 *         image:
 *           type: string
 *           description: Image URL
 */

/**
 * @swagger
 * /api/labs:
 *   get:
 *     summary: Get all labs
 *     tags: [Labs]
 *     responses:
 *       200:
 *         description: List of all lab pages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LabPage'
 */

/**
 * @swagger
 * /api/labs/{type}:
 *   get:
 *     summary: Get lab by type
 *     tags: [Labs]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [organic, inorganic, microbiology]
 *         description: Lab type
 *     responses:
 *       200:
 *         description: Lab page details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LabPage'
 *       404:
 *         description: Lab not found
 *   put:
 *     summary: Update lab (Admin only)
 *     tags: [Labs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [organic, inorganic, microbiology]
 *         description: Lab type
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: object
 *               description:
 *                 type: object
 *               features:
 *                 type: array
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Lab updated successfully
 *       404:
 *         description: Lab not found
 */

router.route('/')
  .get(getLabs);

router.route('/:type')
  .get(getLabByType)
  .put(protect, upload.single('image'), updateLab);

module.exports = router;
