import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Home from './pages/Dashboard/Home'
import Income from './pages/Dashboard/Income'
import Expense from './pages/Dashboard/Expense'
import ForgotPassword from './pages/Auth/ForgotPassword'
import ResetPassword from './pages/Auth/ResetPassword'
import ChangePassword from './pages/Dashboard/ChangePassword'
import UserProvider from './context/UserContext'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signUp" exact element={<SignUp />} />
            <Route path="/dashboard" exact element={<Home />} />
            <Route path="/income" exact element={<Income />} />
            <Route path="/expense" exact element={<Expense />} />
            <Route path="/forgot-password" exact element={<ForgotPassword />} />
            <Route path="/reset-password" exact element={<ResetPassword />} />
            <Route path="/change-password" exact element={<ChangePassword />} />
          </Routes>
        </Router>
        <ToastContainer />
      </div>
    </UserProvider>
  )
}

export default App

const Root = () => {
  // check if token exists in local storage
  const isAuthenticated = !!localStorage.getItem('token')

  // redirect to dashboard if authenticated, otherwise redirect to login
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
}
