const jwt = require('jsonwebtoken')
const User = require('../models/User.js')

const protectAuth = async (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1]
  console.log('token: ', token)
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (!decoded) {
      return res.status(401).json({ message: 'Not authorized, token failed' })
    }
    req.user = await User.findById(decoded.userId).select('-password')
    next()
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' })
  }
}

module.exports = { protectAuth }
