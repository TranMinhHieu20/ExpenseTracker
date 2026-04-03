const { generateToken } = require('../config/generateToken.js')
const User = require('../models/User.js')

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
      return res.status(400).json({ message: 'User already exists!' })
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
