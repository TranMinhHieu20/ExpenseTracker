const express = require('express')
const {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel,
  updateExpense
} = require('../controllers/expenseController.js')
const { protectAuth } = require('../middleware/authMiddleware.js')

const router = express.Router()
router.use(protectAuth)

router.post('/add', addExpense)
router.get('/getExpenses', getAllExpense)
router.get('/downloadexcel', downloadExpenseExcel)
router.delete('/:id', deleteExpense)
router.put('/:id', updateExpense)

module.exports = router
