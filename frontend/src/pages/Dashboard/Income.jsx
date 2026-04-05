import React, { useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverView from '../../components/Income/IncomeOverView'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { useEffect } from 'react'
import Modal from '../../components/Modal'
import { useUserAuth } from '../../hooks/useUserAuth'
import AddIncomeForm from '../../components/Income/AddIncomeForm'
import { toast } from 'react-toastify'
import { data } from 'react-router-dom'
import IncomeList from '../../components/Income/IncomeList'

const Income = () => {
  useUserAuth()
  const [incomeData, setIncomeData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  })
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)

  // get all income
  const fetchIncomeDetails = async () => {
    if (loading) return

    setLoading(true)

    try {
      const res = await axiosInstance(API_PATHS.INCOME.GET_ALL_INCOME)
      if (res.data) {
        setIncomeData(res.data)
      }
      console.log('getincome:', res.data)
    } catch (error) {
      console.log('Something went wrong. Please try again!', error)
    } finally {
      setLoading(false)
    }
  }

  // handle add income
  const handleAddIncome = async (income) => {
    const { source, icon, amount, date } = income
    // validate check
    if (!source.trim()) {
      toast.error('Source is required.')
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
      const res = await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, { source, icon, amount, date })
      if (res.data) {
        setOpenAddIncomeModal(false)
        toast.success('Income added successfully!')
        fetchIncomeDetails() // Load lại danh sách mới
      }
    } catch (error) {
      console.log('Something went wrong. Please try again!', error)
    } finally {
      setLoading(false)
    }
  }

  // handle delete income
  const handleDeleteIncome = async () => {}

  // handle download excel
  const handleDownloadIncomeDetails = async () => {}

  useEffect(() => {
    fetchIncomeDetails()

    return () => {}
  }, [])

  return (
    <DashboardLayout activeMenu="Income">
      <div className="w-full my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <IncomeOverView
              transactions={incomeData}
              onAddIncome={() => {
                setOpenAddIncomeModal(true)
              }}
            />
          </div>
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => openDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>
        <Modal isOpen={openAddIncomeModal} onClose={() => setOpenAddIncomeModal(false)} title="Add Income">
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income
