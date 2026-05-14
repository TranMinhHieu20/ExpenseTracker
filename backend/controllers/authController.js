const { generateToken } = require('../config/generateToken.js')
const User = require('../models/User.js')
const sendEmail = require('../utils/sendEmail.js')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

// @desc    Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password, profileImageUrl } = req.body

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields!' })
    }

    // validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format!' })
    }

    // check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists!' })
    }

    const user = await User.create({ fullname, email, password, profileImageUrl })
    if (user) {
      generateToken(res, user._id)
      res.status(201).json({
        _id: user._id,
        user,
        token: generateToken(res, user._id)
      })
    }
  } catch (error) {
    console.error('Error registering user:', error)
    res.status(500).json({ message: 'Server error!' })
  }
}

// @desc    Login user and get token
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields!' })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password!' })
    }

    // Check if the password is correct
    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password!' })
    }

    // Generate token
    generateToken(res, user._id)
    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(res, user._id)
    })
  } catch (error) {
    console.log('Error logging in user:', error)
    res.status(500).json({ message: 'Server error!' })
  }
}

// @desc    Logout user clear the token
exports.logoutUser = async (req, res) => {
  res.clearCookie('token', {
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  })
  res.status(200).json({ message: 'Logged out successfully!' })
}

// @desc    getInfo user
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'User not found!' })
    }
    res.status(200).json({ user })
  } catch (error) {
    console.log('Error getUserInfo in user:', error)
    res.status(500).json({ message: 'Server error!' })
  }
}

// @desc    Forgot Password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body
    if (!email) return res.status(400).json({ message: 'Please provide email!' })

    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'User not found!' })

    // Generate a 6-digit OTP
    const resetOTP = Math.floor(100000 + Math.random() * 900000).toString()

    // Hash the OTP and set to resetPasswordOTP
    user.resetPasswordOTP = crypto.createHash('sha256').update(resetOTP).digest('hex')
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000 // 10 minutes

    await user.save()

    const message = `Your password reset OTP is: ${resetOTP}.\nIt is valid for 10 minutes.`

    try {
      await sendEmail({
        email: user.email,
        subject: 'Expense Tracker - Password Reset OTP',
        message
      })
      res.status(200).json({ message: 'Email sent' })
    } catch (err) {
      user.resetPasswordOTP = undefined
      user.resetPasswordExpire = undefined
      await user.save()
      return res.status(500).json({ message: 'Email could not be sent' })
    }
  } catch (error) {
    console.error('Error in forgotPassword:', error)
    res.status(500).json({ message: 'Server error!' })
  }
}

// @desc    Reset Password with OTP
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: 'Please provide email, otp, and newPassword!' })
    }

    const resetPasswordOTP = crypto.createHash('sha256').update(otp).digest('hex')

    const user = await User.findOne({
      email,
      resetPasswordOTP,
      resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired OTP!' })
    }

    // Set new password
    user.password = newPassword
    user.resetPasswordOTP = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    // Log the user in or just return success
    res.status(200).json({ message: 'Password updated successfully' })
  } catch (error) {
    console.error('Error in resetPassword:', error)
    res.status(500).json({ message: 'Server error!' })
  }
}

// @desc    Change Password (Logged in user)
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Please provide oldPassword and newPassword!' })
    }

    const user = await User.findById(req.user._id)

    // Check old password
    const isMatch = await user.matchPassword(oldPassword)
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect old password!' })
    }

    // Save new password
    user.password = newPassword
    await user.save()

    res.status(200).json({ message: 'Password changed successfully!' })
  } catch (error) {
    console.error('Error in changePassword:', error)
    res.status(500).json({ message: 'Server error!' })
  }
}

// @desc    Google Login
exports.googleLogin = async (req, res) => {
  try {
    const { credential } = req.body
    if (!credential) {
      return res.status(400).json({ message: 'Missing credential' })
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload()
    const { email, name, picture } = payload

    // Check if user exists
    let user = await User.findOne({ email })
    if (!user) {
      // Create new user, generate a random password since it's required
      const randomPassword = crypto.randomBytes(16).toString('hex')
      user = await User.create({
        fullname: name,
        email: email,
        password: randomPassword,
        profileImageUrl: picture
      })
    }

    // Generate token
    generateToken(res, user._id)
    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(res, user._id)
    })
  } catch (error) {
    console.error('Error in googleLogin:', error)
    res.status(500).json({ message: 'Google Login Failed!' })
  }
}


