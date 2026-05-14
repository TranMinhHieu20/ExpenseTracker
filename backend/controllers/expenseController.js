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
    await Expense.findByIdAndDelete(req.params.id, { userId })
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

    const data = expense.map((item, index) => ({
      'STT': index + 1,
      'Danh mục': item.category,
      'Số tiền': item.amount,
      'Ngày tháng': new Date(item.date).toLocaleDateString('vi-VN')
    }))

    const wb = xlsx.utils.book_new()
    const ws = xlsx.utils.json_to_sheet(data)
    xlsx.utils.book_append_sheet(wb, ws, 'Expense')
    xlsx.writeFile(wb, 'expense_details.xlsx')
    res.download('expense_details.xlsx')
  } catch (error) {
    console.log('Error Download Expense Excel In ExpenseController', error)
    res.status(500).json({ message: 'Server error' })
  }
}

const updateExpense = async (req, res) => {
  try {
    const userId = req.user._id
    const { id } = req.params
    const { icon, category, amount, date } = req.body

    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: id, userId },
      { icon, category, amount, date: new Date(date) },
      { new: true }
    )

    if (!updatedExpense) {
      return res.status(404).json({ message: 'Expense not found' })
    }

    res.status(200).json(updatedExpense)
  } catch (error) {
    console.error('Error updating expense:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { addExpense, getAllExpense, deleteExpense, downloadExpenseExcel, updateExpense }
