import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import { toast } from 'react-toastify'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import ExpenseOverview from '../../components/Expense/ExpenseOverview'
import Modal from '../../components/Modal'
import AddExpenseForm from '../../components/Expense/AddExpenseForm'
import ExpenseList from '../../components/Expense/ExpenseList'
import DeleteAlert from '../../components/DeleteAlert'

const Expense = () => {
  useUserAuth()

  const [expenseData, setExpenseData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  })
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)
  const [editExpenseData, setEditExpenseData] = useState(null)

  // get all expense
  const fetchExpenseDetails = async () => {
    if (loading) return

    setLoading(true)

    try {
      const res = await axiosInstance(API_PATHS.EXPENSE.GET_ALL_EXPENSE)
      if (res.data) {
        setExpenseData(res.data)
      }
      console.log('getExpense:', res.data)
    } catch (error) {
      console.log('Something went wrong. Please try again!', error)
    } finally {
      setLoading(false)
    }
  }

  // handle add or edit Expense
  const handleAddExpense = async (incomeData) => {
    const { category, icon, amount, date } = incomeData
    // validate check
    if (!category.trim()) {
      toast.error('category is required.')
      return
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error('Amount should be a valid number greater than 0.')
      return
    }
    if (!date) {
      toast.error('Date is required.')
      return
    }
    if (loading) return

    try {
      let res
      if (editExpenseData) {
        res = await axiosInstance.put(API_PATHS.EXPENSE.UPDATE_EXPENSE(editExpenseData._id), {
          category,
          icon,
          amount,
          date
        })
      } else {
        res = await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, { category, icon, amount, date })
      }

      if (res.data) {
        setOpenAddExpenseModal(false)
        setEditExpenseData(null)
        toast.success(editExpenseData ? 'Expense updated successfully!' : 'Expense added successfully!')
        fetchExpenseDetails()
      }
    } catch (error) {
      console.log('Something went wrong. Please try again!', error)
    } finally {
      setLoading(false)
    }
  }
  // handle delete Expense
  const handleDeleteExpense = async (id) => {
    try {
      const res = await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))
      if (res.data) {
        toast.success('Expense deleted successfully!')
        setOpenDeleteAlert({ show: false, data: null })
        fetchExpenseDetails()
      }
    } catch (error) {
      console.log('Something went wrong. Please try again!', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditExpense = (data) => {
    setEditExpenseData(data)
    setOpenAddExpenseModal(true)
  }
  // download
  const handleDownloadExpenseDetails = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: 'blob'
      })

      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'expense_details.xlsx')
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.log('Something went wrong. Please try again!', error)
      toast.error('Failed to download expense details. Please try again!')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExpenseDetails()
    return () => {}
  }, [])

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="w-full my-5 mx-auto">
        <div className>
          <div className>
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => {
                setEditExpenseData(null)
                setOpenAddExpenseModal(true)
              }}
            />
          </div>
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id })
            }}
            onDownload={handleDownloadExpenseDetails}
            onEdit={handleEditExpense}
          />
        </div>
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => {
            setOpenAddExpenseModal(false)
            setEditExpenseData(null)
          }}
          title={editExpenseData ? 'Edit Expense' : 'Add Expense'}
        >
          <AddExpenseForm onAddExpense={handleAddExpense} editData={editExpenseData} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => {
            setOpenDeleteAlert({ show: false, date: null })
          }}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense details?"
            onDelete={() => {
              handleDeleteExpense(openDeleteAlert.data)
            }}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense
