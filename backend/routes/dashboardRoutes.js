const express = require('express')
const { getDashboardData } = require('../controllers/dashboardController.js')
const { protectAuth } = require('../middleware/authMiddleware.js')

const router = express.Router()

router.use(protectAuth)

router.get('/', getDashboardData)

module.exports = router
