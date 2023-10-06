import express from "express"
import mongoose from "mongoose"

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
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
    res.send({ data: 'Event created'})
})
router.put('/', (req, res) => {
    res.send({ data: 'Event updated'})
})
router.delete('/', (req, res) => {
    res.send({ data: 'Event deleted'})
})


export default router