require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const { connectDB } = require('./config/db.js')
const authRoutes = require('./routes/authRoutes.js')
const incomeRoutes = require('./routes/incomeRoutes.js')
const expenseRoutes = require('./routes/expenseRoutes.js')
const dashboardRoutes = require('./routes/dashboardRoutes.js')
const cookieParser = require('cookie-parser')

connectDB()

const PORT = process.env.PORT
const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
    // allowedHeaders: ['Content-Type', 'Authorization']
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// Cấp quyền cho trình duyệt truy cập vào thư mục uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/income', incomeRoutes)
app.use('/api/v1/expense', expenseRoutes)
app.use('/api/v1/dashboard', dashboardRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
  connectDB()
})
