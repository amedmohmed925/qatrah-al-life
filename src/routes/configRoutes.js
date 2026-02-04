const express = require('express');
const {
  getConfig,
  updateConfig,
  updateStats,
  incrementVisitors,
} = require('../controllers/configController');
const { protect } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     GeneralConfig:
 *       type: object
 *       properties:
 *         stats:
 *           type: object
 *           properties:
 *             newProjects:
 *               type: number
 *             ongoingProjects:
 *               type: number
 *             finishedProjects:
 *               type: number
 *             visitors:
 *               type: number
 *         contactInfo:
 *           type: object
 *           properties:
 *             phone:
 *               type: string
 *             email:
 *               type: string
 *             whatsapp:
 *               type: string
 *             address:
 *               type: string
 *         socialLinks:
 *           type: object
 *           properties:
 *             facebook:
 *               type: string
 *             linkedin:
 *               type: string
 *             twitter:
 *               type: string
 */

/**
 * @swagger
 * /api/config:
 *   get:
 *     summary: Get general site configuration
 *     tags: [Config]
 *     responses:
 *       200:
 *         description: Site configuration
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralConfig'
 *   put:
 *     summary: Update general site configuration (Admin only)
 *     tags: [Config]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GeneralConfig'
 *     responses:
 *       200:
 *         description: Configuration updated successfully
 */

/**
 * @swagger
 * /api/config/stats:
 *   patch:
 *     summary: Update site statistics (Admin only)
 *     tags: [Config]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stats:
 *                 type: object
 *                 properties:
 *                   newProjects:
 *                     type: number
 *                   ongoingProjects:
 *                     type: number
 *                   finishedProjects:
 *                     type: number
 *                   visitors:
 *                     type: number
 *     responses:
 *       200:
 *         description: Statistics updated successfully
 */

/**
 * @swagger
 * /api/config/visitors:
 *   patch:
 *     summary: Increment visitor count
 *     tags: [Config]
 *     responses:
 *       200:
 *         description: Visitor count incremented
 */

router.route('/')
  .get(getConfig)
  .put(protect, updateConfig);

router.route('/stats')
  .patch(protect, updateStats);

router.route('/visitors')
  .patch(incrementVisitors);

module.exports = router;
