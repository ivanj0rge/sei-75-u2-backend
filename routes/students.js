import express from "express"
import mongoose from "mongoose"

const studentsRoute = express.Router()

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  dob: { type: Date, required: true },
  graduation: { type: String },
  attendance: [
    {
      date: { type: Date, default: Date.now },
      attended: { type: Boolean, default: false },
    }
  ]
})
StudentSchema.virtual('isSenior').get(function () {
  const currentDate = new Date()
  const age = currentDate.getFullYear() - this.dob.getFullYear()
  return age >= 15;
})

const Student = mongoose.model('Student', StudentSchema);


studentsRoute.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

studentsRoute.post('/', async (req, res) => {
  try {
    const newStudent = new Student({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      dob: req.body.dob,
      graduation: req.body.graduation,
      attendance: req.body.attendance
    });

    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

studentsRoute.put('/:id', async (req, res) => {
  try {
    const studentId = req.params.id;
    const updatedStudentData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      dob: req.body.dob,
      graduation: req.body.graduation,
      attendance: req.body.attendance
    };
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      updatedStudentData,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

studentsRoute.delete('/:id', async (req, res) => {
  try {
    const studentId = req.params.id;

    const deletedStudent = await Student.findByIdAndRemove(studentId);

    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})


export default studentsRoute
export { Student }
