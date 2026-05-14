import { useState, useEffect } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { API_PATHS } from '../../utils/apiPaths'
import axiosInstance from '../../utils/axiosInstance'
import toast from 'react-hot-toast'

const ResetPassword = () => {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email)
    }
  }, [location])

  const handleResetPassword = async (e) => {
    e.preventDefault()

    if (!email || !otp || !newPassword) {
      setError('Please fill in all fields')
      return
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setError('')
    setLoading(true)

    try {
      await axiosInstance.post(API_PATHS.AUTH.RESET_PASSWORD, {
        email,
        otp,
        newPassword
      })
      toast.success('Password reset successfully! You can now login.')
      navigate('/login')
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
    <AuthLayout>
      <div className="w-full lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Reset Password</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">Enter OTP from your email and new password</p>
        <form onSubmit={handleResetPassword} className="w-full">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email:"
            type="email"
            placeholder="Enter your email"
            disabled={!!location.state?.email}
          />
          <Input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            label="OTP (6 digits):"
            type="text"
            placeholder="Enter OTP"
          />
          <Input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            label="New Password:"
            type="password"
            placeholder="Enter new password"
          />
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-md mt-4 cursor-pointer hover:bg-purple-700 transition"
          >
            {loading ? 'Processing...' : 'RESET PASSWORD'}
          </button>
          <p className="text-center text-sm mt-4">
            <Link to="/login" className="text-primary underline">
              Back to Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default ResetPassword
