import express from "express"
import mongoose from "mongoose"
// import studentsRoute, { Student } from "./students"
// import instructorsRoute from "./instructors"

const loginRoute = express.Router()

mongoose.connect(process.env.DATABASE_URL);
const userSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true
  },
  lastLogin: {
    type: Date,
    require: true
  }
})
const User = mongoose.model('User', userSchema)

loginRoute.post('', async (req, res) => {
    const now = new Date()
    if ( await User.count({'userEmail': req.body.email}) === 0 ) {
      const newUser = new User ({userEmail: req.body.email, lastLogin: now})
      newUser.save()
        .then(() => {
          res.sendStatus(200)
        })
      }else {
        await User.findOneAndUpdate({'userEmail': req.body.email}, {lastLogin: now})
        res.sendStatus(200)
      }
    })

export default loginRoute