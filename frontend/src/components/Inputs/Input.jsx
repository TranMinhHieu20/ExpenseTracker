import React, { useState } from 'react'
import { FaEye } from 'react-icons/fa6'
import { IoIosEyeOff } from 'react-icons/io'

const Input = ({ label, type, placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div className="">
      <label className="text-[13px] text-slate-800 dark:text-white">{label}</label>
      <div className="input-box">
        <input
          type={type == 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
          className="w-full bg-transparent outline-none"
          required
        />

        {type === 'password' && (
          <div className="">
            {showPassword ? (
              <FaEye size={22} className="text-black cursor-pointer" onClick={() => togglePassword()} />
            ) : (
              <IoIosEyeOff size={22} className="text-black cursor-pointer" onClick={() => togglePassword()} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Input
