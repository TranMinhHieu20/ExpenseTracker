const express = require('express')
const {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel
} = require('../controllers/expenseController.js')
const { protectAuth } = require('../middleware/authMiddleware.js')

const router = express.Router()
router.use(protectAuth)

router.post('/add', addExpense)
router.get('get', getAllExpense)
router.get('/downloadexcel', deleteExpense)
router.delete('/:id', downloadExpenseExcel)

module.exports = router
