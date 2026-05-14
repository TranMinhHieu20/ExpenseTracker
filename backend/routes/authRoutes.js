const express = require('express')
const { registerUser, loginUser, logoutUser, getUserInfo, forgotPassword, resetPassword, changePassword, googleLogin } = require('../controllers/authController.js')
const { protectAuth } = require('../middleware/authMiddleware.js')
const { upload } = require('../middleware/uploadMiddleware.js')

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.post('/change-password', protectAuth, changePassword)
router.post('/google', googleLogin)

router.get('/checkAuth', protectAuth, (req, res) => {
  res.status(200).json({ message: 'Authenticated', user: req.user })
})

router.get('/getUser', protectAuth, getUserInfo)

router.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' })
  }
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
  res.status(200).json(imageUrl)
})

module.exports = router
