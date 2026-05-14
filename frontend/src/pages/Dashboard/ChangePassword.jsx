import React, { useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import Input from '../../components/Inputs/Input'
import { API_PATHS } from '../../utils/apiPaths'
import axiosInstance from '../../utils/axiosInstance'
import toast from 'react-hot-toast'

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChangePassword = async (e) => {
    e.preventDefault()

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match')
      return
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters')
      return
    }

    setError('')
    setLoading(true)

    try {
      await axiosInstance.post(API_PATHS.AUTH.CHANGE_PASSWORD, {
        oldPassword,
        newPassword
      })
      toast.success('Password changed successfully!')
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError('An error occurred. Please try again later.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout activeMenu="Change Password">
      <div className="my-5 mx-auto w-full max-w-md bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-black mb-4">Change Password</h3>
        <form onSubmit={handleChangePassword} className="w-full">
          <Input
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            label="Old Password:"
            type="password"
            placeholder="Enter old password"
          />
          <Input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            label="New Password:"
            type="password"
            placeholder="Enter new password"
          />
          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            label="Confirm New Password:"
            type="password"
            placeholder="Confirm new password"
          />
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-md mt-4 cursor-pointer hover:bg-purple-700 transition"
          >
            {loading ? 'Changing...' : 'CHANGE PASSWORD'}
          </button>
        </form>
      </div>
    </DashboardLayout>
  )
}

export default ChangePassword
