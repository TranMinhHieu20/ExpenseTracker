import { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate, Link } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helps'
import { API_PATHS } from '../../utils/apiPaths'
import axiosInstance from '../../utils/axiosInstance'
import toast from 'react-hot-toast'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleForgotPassword = async (e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setError('')
    setLoading(true)

    try {
      await axiosInstance.post(API_PATHS.AUTH.FORGOT_PASSWORD, { email })
      toast.success('OTP sent to your email!')
      navigate('/reset-password', { state: { email } })
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
        <h3 className="text-xl font-semibold text-black">Forgot Password</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">Enter your email to receive an OTP</p>
        <form onSubmit={handleForgotPassword} className="w-full">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email:"
            type="email"
            placeholder="Enter your email"
          />
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-md mt-4 cursor-pointer hover:bg-purple-700 transition"
          >
            {loading ? 'Sending...' : 'SEND OTP'}
          </button>
          <p className="text-center text-sm mt-4">
            Remembered your password?{''}
            <Link to="/login" className="text-primary ml-1 underline">
              LOGIN
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default ForgotPassword
