const jwt = require('jsonwebtoken')
const User = require('../models/User.js')

const protectAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (!decoded) {
      return res.status(401).json({ message: 'Not authorized, token failed' })
    }

    const user = await User.findById(decoded.userId).select('-password')
    if (!user) {
      return res.status(401).json({ message: 'Not authorized, user not found' })
    }
    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' })
    console.log('Error Server In authMiddleware', error)
  }
}

module.exports = { protectAuth }
