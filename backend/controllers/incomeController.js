const xlsx = require('xlsx')
const Income = require('../models/Income.js')

const addIncome = async (req, res) => {
  try {
    const userId = req.user._id
    const { icon, source, amount, date } = req.body
    //validate
    if (!source || !amount || !date) {
      return res.status(400).json({ message: 'Please fill in all required fields' })
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date)
    })

    await newIncome.save()
    res.status(201).json(newIncome)
  } catch (error) {
    console.error('Error adding income:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

//
const getAllIncome = async (req, res) => {
  try {
    const userId = req.user._id

    const income = await Income.find({ userId }).sort({ date: -1 })
    res.status(200).json(income)
  } catch (error) {
    console.error('Error getAllIncome:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

//
const deleteIncome = async (req, res) => {
  try {
    const userId = req.user._id
    await Income.findByIdAndDelete(req.params.id, { userId })
    res.status(200).json({ message: 'Income deleted successfully' })
  } catch (error) {
    console.error('Error deleting income:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

//
const downloadIncomeExcel = async (req, res) => {
  try {
    const userId = req.user._id
    const income = await Income.find({ userId }).sort({ date: -1 })

    // Prepare data for excel
    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date
    }))

    const wb = xlsx.utils.book_new()
    const ws = xlsx.utils.json_to_sheet(data)
    xlsx.utils.book_append_sheet(wb, ws, 'Income')
    xlsx.writeFile(wb, 'income_details.xlsx')
    res.download('income_details.xlsx')
    res.status(200).json({ message: 'Excel file downloaded successfully' })
  } catch (error) {
    console.error('Error downloading income Excel:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { addIncome, getAllIncome, deleteIncome, downloadIncomeExcel }
