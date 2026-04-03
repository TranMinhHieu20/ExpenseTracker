const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    profileImageUrl: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
)

// hash password before saving
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return
  }
  this.password = await bcrypt.hash(this.password, 10)
})

// method to compare password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', UserSchema)

module.exports = User
