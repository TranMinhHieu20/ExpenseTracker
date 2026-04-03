import React from 'react'
import loginCard from '../../assets/images/loginCard.jpg'
import { LuTrendingUpDown } from 'react-icons/lu'

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* LEFT SIDE */}
      <div className="w-full md:w-[55vw] px-8 md:px-16 py-12 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Expense Tracker</h2>

        <div className="w-full ">{children}</div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:flex w-[45vw] relative bg-gradient-to-br from-violet-100 to-purple-50 overflow-hidden items-center justify-center">
        {/* Decorative shapes */}
        <div className="w-56 h-56 rounded-[40px] bg-purple-600 absolute -top-10 -left-10 opacity-80"></div>

        <div className="w-56 h-56 rounded-[40px] border-[18px] border-fuchsia-500 absolute top-[30%] right-10 opacity-70"></div>

        <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-10 -left-10 opacity-80"></div>

        {/* Stats Card */}
        <div className="absolute top-16 right-16 z-20">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expenses"
            value="$998,000"
            color="bg-purple-600"
          />
        </div>

        {/* Image */}
        <img src={loginCard} alt="Login Illustration" className="relative w-[85%] max-w-lg drop-shadow-2xl" />
      </div>
    </div>
  )
}

export default AuthLayout

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-4 bg-white px-5 py-4 rounded-2xl shadow-lg border border-gray-100 backdrop-blur-md">
      <div className={`w-12 h-12 flex items-center justify-center text-xl text-white ${color} rounded-full shadow-md`}>
        {icon}
      </div>

      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  )
}
