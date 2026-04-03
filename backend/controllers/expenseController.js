const Expense = require('../models/Expense.js')
const xlsx = require('xlsx')

const addExpense = async (req, res) => {
  try {
    const userId = req.user._id
    const { icon, category, amount, date } = req.body
    if (!category || !amount || !date) {
      return res.status(400).json({ message: 'Category and amount are required' })
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date)
    })
    await newExpense.save()
    res.status(201).json(newExpense)
  } catch (error) {
    console.log('Error Add Expense In ExpenseController', error)
    res.status(500).json({ message: 'Server error' })
  }
}
const getAllExpense = async (req, res) => {
  try {
    const userId = req.user._id
    const expense = await Expense.find({ userId }).sort({ date: -1 })
    res.status(200).json(expense)
  } catch (error) {
    console.log('Error Get All Expense In ExpenseController', error)
    res.status(500).json({ message: 'Server error' })
  }
}
const deleteExpense = async (req, res) => {
  try {
    const userId = req.user._id
    await Expense.findByIdAndDelete(userId)
    res.status(200).json({ message: 'Expense deleted successfully' })
  } catch (error) {
    console.log('Error Delete Expense In ExpenseController', error)
    res.status(500).json({ message: 'Server error' })
  }
}
const downloadExpenseExcel = async (req, res) => {
  try {
    const userId = req.user._id
    const expense = await Expense.find({ userId }).sort({ date: -1 })

    const data = expense.map((item) => ({
      category: item.category,
      amount: item.amount,
      Date: item.date
    }))

    const wb = xlsx.utils.book_new()
    const ws = xlsx.utils.json_to_sheet(data)
    xlsx.utils.book_append_sheet(wb, ws, 'Income')
    xlsx.writeFile(wb, 'income_details.xlsx')
    res.download('income_details.xlsx')
    res.status(200).json({ message: 'Excel file downloaded successfully' })
  } catch (error) {
    console.log('Error Download Expense Excel In ExpenseController', error)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { addExpense, getAllExpense, deleteExpense, downloadExpenseExcel }
