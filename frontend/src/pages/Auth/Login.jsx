import { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate, Link } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helps'
import { API_PATHS } from '../../utils/apiPaths'
import axiosInstance from '../../utils/axiosInstance'
import { UserContext } from '../../context/UserContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const { updateUser } = useContext(UserContext)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }
    if (!password) {
      setError('Please enter your password')
      return
    }

    setError('')

    // call api login
    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      })

      const { token, user } = res.data
      console.log('Login response: ', user)

      if (token) {
        localStorage.setItem('token', token)
        updateUser(user)
        navigate('/dashboard')
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError('An error occurred. Please try again later.')
      }
    }
  }
  return (
    <AuthLayout>
      <div className="w-full lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">Please enter your details to login</p>
        <form onSubmit={handleLogin} className="w-full">
          <Input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            label="Email:"
            type="email"
            placeholder="Enter your email"
          />
          <Input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            label="Password:"
            type="password"
            placeholder="Enter your password"
            className="relative"
          />
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-md mt-4 cursor-pointer hover:bg-purple-700 transition"
          >
            LOGIN
          </button>
          <p className="text-center text-sm mt-4">
            Don't have an account?{''}
            <Link to="/signUp" className="text-primary ml-1 underline">
              SIGN UP
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login
