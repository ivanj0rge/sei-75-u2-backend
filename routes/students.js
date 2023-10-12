import express from "express"
import mongoose from "mongoose"
import moment from "moment"
import { Session } from './sessions.js'

const studentsRoute = express.Router()

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  dob: { type: Date, required: true },
  graduation: { type: String },
  attendance: { type: Boolean },
  sessionsAttended: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }]
})

const Student = mongoose.model('Student', StudentSchema);

studentsRoute.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    const formattedDob = students.map(student => ({
      id: student._id,
      name: student.name,
      email: student.email,
      phone: student.phone,
      dob: moment(student.dob).format('DD-MM-YYYY'),
      graduation: student.graduation,
      attendance: student.attendance,
      sessionsAttended: student.sessionsAttended
    }))
    res.json(formattedDob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

studentsRoute.get(`/:id`, async (req, res) => {
  const id = req.params.id
  const student = await Student.findById(id)
  res.json(student)
})

studentsRoute.post('/', async (req, res) => {
  try {
    const newStudent = new Student({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      dob: req.body.dob,
      graduation: req.body.graduation,
      attendance: req.body.attendance,
      sessionsAttended: req.body.sessionsAttended
    });

    const savedStudent = await newStudent.save();
    res.status(200).json(savedStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

  studentsRoute.put('/:id/attendance', async (req, res) => {
    try {
      const studentId = req.params.id;
      const { attended } = req.body;
  
      const student = await Student.findById(studentId);
  
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      const currentSession = await Session.findOne({ date: moment().format('YYYY-MM-DD') });
  
      if (!currentSession) {
        return res.status(404).json({ error: 'No session found for today' });
      }
  
      const attendanceRecord = {
        session: currentSession._id,
        attended,
      };
  
      student.attendance.push(attendanceRecord);
      await student.save();
  
      res.json({ message: 'Attendance recorded successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  

studentsRoute.get('/:id/attendance', async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json(student.attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
      attendance: req.body.attendance,
      sessionsAttended: req.body.sessionsAttended

    };
    const updatedStudent = await Student.findByIdAndUpdate(studentId, updatedStudentData, { new: true });

    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    const studentIds = req.body.attendance.map(item => item.studentId);
    const currentSession = await Session.findOne({ date: moment().format('YYYY-MM-DD') });

    if (!currentSession) {
      return res.status(404).json({ error: 'No session found for today' });
    }

    currentSession.attendance = studentIds;
    await currentSession.save();

    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


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
