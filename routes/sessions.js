import express from "express"
import mongoose from "mongoose"

const sessionSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    attendance: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
      }
    ]
  })

const router = express.Router()

router.get('/', (req, res) => {
    res.send({ data: 'Here is your data'})
})
router.post('/', (req, res) => {
    res.send({ data: 'Session data created'})
})
router.put('/', (req, res) => {
    res.send({ data: 'Session data updated'})
})
router.delete('/', (req, res) => {
    res.send({ data: 'Session data deleted'})
})


export default router