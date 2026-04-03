const mongoose = require('mongoose')

const DashboardSchema = new mongoose.Schema()

const Dashboard = mongoose.model('Dashboard', DashboardSchema)

module.exports = Dashboard
