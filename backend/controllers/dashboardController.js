// const Income = require('../models/Income.js')
// const Expense = require('../models/Expense.js')
// const { Types, isValidObjectId } = require('mongoose')

// // DashBoard Data
// const getDashboardData = async (req, res) => {
//   try {
//     const userId = req.user._id
//     const serObjectId = new Types.ObjectId(String(userId))

//     //  Fetch total income & expense

//     const totalIncome = await Income.aggregate([
//       {
//         $match: { userId: serObjectId },
//         $group: { _id: null, total: { $sum: '$amount' } }
//       }
//     ])
//     console.log('totalIncome: ', { totalIncome, userId: isValidObjectId(userId) })

//     const totalExpense = await Expense.aggregate([
//       {
//         $match: { userId: serObjectId },
//         $group: { _id: null, total: { $sum: '$amount' } }
//       }
//     ])

//     //  get income transaction in the last 60 days
//     const last60DaysIncomeTransactions = await Income.find({
//       userId: serObjectId,
//       date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
//     }).sort({ date: -1 })

//     // get total expense transaction in the last 60 days
//     const incomeLast60Days = last60DaysIncomeTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)

//     // get expense transaction in the last 30 days
//     const last30DaysExpenseTransactions = await Expense.find({
//       userId: serObjectId,
//       date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
//     }).sort({ date: -1 })

//     // get total expense transaction in the last 30 days
//     const expenseLast30Days = last30DaysExpenseTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)

//     // fetch last 5 transaction (income & expense)
//     const lastTransactions = [
//       ...(await Income.find({ userId }))
//         .sort({ date: -1 })
//         .limit(5)
//         .map((txn) => ({ ...txn.toObject(), type: 'income' })),
//       ...(await Expense.find({ userId }))
//         .sort({ date: -1 })
//         .limit(5)
//         .map((txn) => ({ ...txn.toObject(), type: 'expense' }))
//     ].sort((a, b) => b.date - a.date) // sort latest first

//     //  final Res
//     res.status(200).json({
//       totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
//       totalIncome: totalIncome[0]?.total || 0,
//       totalExpense: totalExpense[0]?.total || 0,
//       incomeLast30Days: {
//         total: expenseLast30Days,
//         transactions: last30DaysExpenseTransactions
//       },
//       incomeLast60Days: {
//         total: expenseLast60Days,
//         transactions: last60DaysExpenseTransactions
//       },
//       recentTransactions: lastTransactions
//     })
//   } catch (error) {
//     console.log('Error getDashboardData in dashboardController', error)
//     res.status(500).json({ message: 'Server error' })
//   }
// }

// module.exports = { getDashboardData }
const Income = require('../models/Income.js')
const Expense = require('../models/Expense.js')
const mongoose = require('mongoose') // Import trực tiếp mongoose

const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id
    // Chuyển đổi ID an toàn
    const serObjectId = new mongoose.Types.ObjectId(String(userId))

    // 1. Tính tổng Thu nhập
    const totalIncomeResult = await Income.aggregate([
      { $match: { userId: serObjectId } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ])

    // 2. Tính tổng Chi tiêu
    const totalExpenseResult = await Expense.aggregate([
      { $match: { userId: serObjectId } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ])

    const totalIncome = totalIncomeResult[0]?.total || 0
    const totalExpense = totalExpenseResult[0]?.total || 0

    // 3. Thu nhập 60 ngày gần nhất
    const last60DaysIncomeTransactions = await Income.find({
      userId: serObjectId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
    }).sort({ date: -1 })
    const incomeTotal60Days = last60DaysIncomeTransactions.reduce((sum, txn) => sum + txn.amount, 0)

    // 4. Chi tiêu 30 ngày gần nhất
    const last30DaysExpenseTransactions = await Expense.find({
      userId: serObjectId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    }).sort({ date: -1 })
    const expenseTotal30Days = last30DaysExpenseTransactions.reduce((sum, txn) => sum + txn.amount, 0)

    // 5. Lấy 5 giao dịch gần đây (Kết hợp Thu & Chi)
    const [recentIncomes, recentExpenses] = await Promise.all([
      Income.find({ userId: serObjectId }).sort({ date: -1 }).limit(5),
      Expense.find({ userId: serObjectId }).sort({ date: -1 }).limit(5)
    ])

    const lastTransactions = [
      ...recentIncomes.map((txn) => ({ ...txn.toObject(), type: 'income' })),
      ...recentExpenses.map((txn) => ({ ...txn.toObject(), type: 'expense' }))
    ]
      .sort((a, b) => b.date - a.date)
      .slice(0, 5) // Lấy top 5 sau khi trộn

    // Trả về kết quả
    res.status(200).json({
      totalBalance: totalIncome - totalExpense,
      totalIncome,
      totalExpense,
      expenseLast30Days: {
        total: expenseTotal30Days,
        transactions: last30DaysExpenseTransactions
      },
      incomeLast60Days: {
        total: incomeTotal60Days,
        transactions: last60DaysIncomeTransactions
      },
      recentTransactions: lastTransactions
    })
  } catch (error) {
    console.error('Error in getDashboardData:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { getDashboardData }
