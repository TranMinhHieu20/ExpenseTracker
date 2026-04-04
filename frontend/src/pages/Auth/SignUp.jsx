import { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate, Link } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helps'
import ProfileSelector from '../../components/Inputs/ProfileSelector'
import { API_PATHS } from '../../utils/apiPaths'
import axiosInstance from '../../utils/axiosInstance'
import { MdUpdate } from 'react-icons/md'
import { UserContext } from '../../context/UserContext'
import { uploadImage } from '../../utils/uploadImage'

const SignUp = () => {
  const [fullname, setFullname] = useState()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profilePic, setProfilePic] = useState(null)
  const { updateUser } = useContext(UserContext)

  const [error, setError] = useState(null)

  const navigate = useNavigate()
  // handle file input change

  const handleSignUp = async (e) => {
    e.preventDefault()
    let profileImageUrl = ''

    if (!fullname) {
      setError('Please enter your fullname')
      return
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }
    if (!password || password.length < 6) {
      setError('Please enter a password with at least 6 characters')
      return
    }

    setError(null)

    // signup logic here, you can send the data to your backend API

    try {
      // upload profile picture if selected
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic)
        profileImageUrl = imgUploadRes || ''
      }
      const res = await axiosInstance.post(API_PATHS.AUTH.SIGNUP, {
        fullname,
        email,
        password,
        profileImageUrl
      })
      const { token, user } = res.data
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
      <div className="w-full lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome to Expense Tracker</h3>
        <p className="text-xs text-slate-700 text-black mt-[5px] mb-6">Create an account to get started</p>
        <form onSubmit={handleSignUp} className="w-full">
          <ProfileSelector image={profilePic} setImage={setProfilePic} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label={'FullName:'}
              value={fullname}
              onChange={(e) => {
                setFullname(e.target.value)
              }}
              placeholder={'Enter your fullname'}
              type="text"
            />
            <Input
              label={'Email:'}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              placeholder={'Enter your email'}
              type="text"
            />
            <div className="col-span-2">
              <Input
                label={'Password:'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                placeholder={'Enter your password'}
                type="password"
              />
            </div>
            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full bg-primary hover:bg-purple-700 text-white cursor-pointer py-3 rounded-md transition"
              >
                SIGN UP
              </button>
            </div>
          </div>
          <p className="text-center text-sm mt-4">
            Already have an account?{''}
            <Link to="/login" className="text-primary ml-1 underline">
              LOGIN
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp
