const express = require('express')

const { addIncome, getAllIncome, deleteIncome, downloadIncomeExcel,updateIncome } = require('../controllers/incomeController.js')
const { protectAuth } = require('../middleware/authMiddleware.js')

const router = express.Router()

router.post('/add', protectAuth, addIncome)
router.get('/getIncomes', protectAuth, getAllIncome)
router.get('/downloadexcel', protectAuth, downloadIncomeExcel)
router.delete('/:id', protectAuth, deleteIncome)
router.put('/:id', protectAuth, updateIncome)

module.exports = router
