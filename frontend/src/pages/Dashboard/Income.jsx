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
import IncomeList from '../../components/Income/IncomeList'
import DeleteAlert from '../../components/DeleteAlert'

const Income = () => {
  useUserAuth()
  const [incomeData, setIncomeData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  })
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)
  const [editIncomeData, setEditIncomeData] = useState(null)

  // get all income
  const fetchIncomeDetails = async () => {
    if (loading) return

    setLoading(true)

    try {
      const res = await axiosInstance(API_PATHS.INCOME.GET_ALL_INCOME)
      if (res.data) {
        setIncomeData(res.data)
      }
      console.log('getIncome:', res.data)
    } catch (error) {
      console.log('Something went wrong. Please try again!', error)
    } finally {
      setLoading(false)
    }
  }

  // handle add or edit income
  const handleAddIncome = async (incomeData) => {
    const { source, icon, amount, date } = incomeData
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
      let res
      if (editIncomeData) {
        res = await axiosInstance.put(API_PATHS.INCOME.UPDATE_INCOME(editIncomeData._id), {
          source,
          icon,
          amount,
          date
        })
      } else {
        res = await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, { source, icon, amount, date })
      }

      if (res.data) {
        setOpenAddIncomeModal(false)
        setEditIncomeData(null)
        toast.success(editIncomeData ? 'Income updated successfully!' : 'Income added successfully!')
        fetchIncomeDetails()
      }
    } catch (error) {
      console.log('Something went wrong. Please try again!', error)
    } finally {
      setLoading(false)
    }
  }

  // handle delete income
  const handleDeleteIncome = async (id) => {
    try {
      const res = await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))
      if (res.data) {
        setOpenDeleteAlert({ show: false, data: null })
        toast.success('Income deleted successfully!')
        fetchIncomeDetails()
      }
    } catch (error) {
      console.log('Something went wrong. Please try again!', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditIncome = (data) => {
    setEditIncomeData(data)
    setOpenAddIncomeModal(true)
  }

  // handle download excel
  const handleDownloadIncomeDetails = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: 'blob'
      })

      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'income_details.xlsx')
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.log('Something went wrong. Please try again!', error)
      toast.error('Failed to download income details. Please try again!')
    } finally {
      setLoading(false)
    }
  }

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
                setEditIncomeData(null)
                setOpenAddIncomeModal(true)
              }}
            />
          </div>
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id })
            }}
            onDownload={handleDownloadIncomeDetails}
            onEdit={handleEditIncome}
          />
        </div>
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => {
            setOpenAddIncomeModal(false)
            setEditIncomeData(null)
          }}
          title={editIncomeData ? 'Edit Income' : 'Add Income'}
        >
          <AddIncomeForm onAddIncome={handleAddIncome} editData={editIncomeData} />
        </Modal>
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => {
            setOpenDeleteAlert({ show: false, date: null })
          }}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income details?"
            onDelete={() => {
              handleDeleteIncome(openDeleteAlert.data)
            }}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income
