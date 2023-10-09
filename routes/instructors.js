import express from "express"
import mongoose from "mongoose"

const instructorsRoute = express.Router()

const InstructorSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
})

const Instructor = mongoose.model('Instructor', InstructorSchema);

instructorsRoute.get('/', async (req, res) => {
    try {
        const instructors = await Instructor.find()
        res.status(200).json({ data: instructors })
    } catch (error) {
        res.status(500).json({ error: 'Unable to retrieve instructors' })
    };
})

instructorsRoute.post('/', async (req, res) => {
    try {
        const { name, email, phone, isAdmin } = req.body
        const newInstructor = new Instructor({ name, email, phone, isAdmin })
        const savedInstructor = await newInstructor.save()
        res.status(201).json({ data: savedInstructor })
    } catch (error) {
        res.status(400).json({ error: 'Unable to create instructor' })
    }
})

instructorsRoute.put('/:id', async (req, res) => {
    try {
        const { instructorId } = req.params
        const { name, email, phone, isAdmin } = req.body

        const updatedInstructor = await Instructor.findByIdAnUpdate(
            instructorId, { name, email, phone, isAdmin },
            { new: true }
        )
        if (!updatedInstructor) {
            return res.status(404).json({ error: 'Instructor not found' })
        }
        res.status(200).json({ data: updatedInstructor })
    } catch (error) {
        res.status(500).json({ error: 'Unable to update instructor' })
    }
})

instructorsRoute.delete('/:id', async (req, res) => {
    try {
        const { instructorId } = req.params
        const deletedInstructor = await Instructor.findByIdAndDelete(instructorId)

        if (!deletedInstructor) {
            return res.status(404).json({ error: 'Instructor not found' })
        }
        res.status(200).json({ data: 'Instructor deleted' })
    } catch (error) {
        res.status(500).json({ error: 'Unable to delete instructor' })
    }
})

export default instructorsRoute