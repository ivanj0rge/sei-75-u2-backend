import express from "express"
import mongoose from "mongoose"

const studentSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    DOB: { type: Date, required: true },
    isSenior: { type: Boolean },
    graduation: { type: String },
    attendance: [
      {
        date: { type: Date, default: Date.now },
        attended: { type: Boolean, default: false },
      }
    ]
  })

const router = express.Router()

router.get('/', (req, res) => {
    res.send({ data: 'Here is your data'})
})
router.post('/', (req, res) => {
    res.send({ data: 'Student created'})
})
router.put('/', (req, res) => {
    res.send({ data: 'Student updated'})
})
router.delete('/', (req, res) => {
    res.send({ data: 'Student deleted'})
})


export default router