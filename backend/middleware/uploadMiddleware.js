const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const fileFilter = (req, file, cb) => {
  // Danh sách các kiểu file ảnh phổ biến
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true) // Chấp nhận file
  } else {
    // Trả về lỗi nếu sai định dạng
    cb(new Error('Chỉ cho phép upload file ảnh (.jpeg, .jpg, .png, .gif)!'), false)
  }
}

const upload = multer({ storage, fileFilter })

module.exports = { upload }
