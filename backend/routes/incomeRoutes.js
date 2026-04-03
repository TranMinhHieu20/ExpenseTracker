const express = require('express')

const { addIncome, getAllIncome, deleteIncome, downloadIncomeExcel } = require('../controllers/incomeController.js')
const { protectAuth } = require('../middleware/authMiddleware.js')

const router = express.Router()

router.post('/add', protectAuth, addIncome)
router.get('/get', protectAuth, getAllIncome)
router.get('/downloadexcel', protectAuth, downloadIncomeExcel)
router.delete('/:id', protectAuth, deleteIncome)

module.exports = router
