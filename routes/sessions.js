import express from "express"
import mongoose from "mongoose"
import { Student } from './students.js'
// import cron from "node-cron"

const SessionSchema = new mongoose.Schema({
  date: { type: String, required: true },
  attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
})
const Session = mongoose.model('Session', SessionSchema);

const sessionRoute = express.Router()

sessionRoute.get('/', async (req, res) => {
  try {
    const sessions = await Session.find()
    res.json(sessions)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

sessionRoute.get(`/:id`, async (req, res) => {
  const id = req.params.id
  const session = await Session.findById(id)
  res.json(session)
})

sessionRoute.post('/', async (req, res) => {
  try {
    const newSession = new Session({
      date: req.body.date,
      attendance: []
    })

    const savedSession = await newSession.save()
    res.status(200).json(savedSession)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

  sessionRoute.put('/:id', async (req, res) => {
    try {
      const sessionId = req.params.id;
      const updatedSessionData = {
        date: req.body.date,
        attendance: req.body.attendance,
      };
  
      const updatedSession = await Session.findByIdAndUpdate(
        sessionId,
        updatedSessionData,
        { new: true }
      );
  
      if (!updatedSession) {
        return res.status(404).json({ error: 'Session not found' });
      }
  
      res.json(updatedSession);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

sessionRoute.delete('/:id', async (req, res) => {
  try {
    const sessionId = req.params.id;

    const deletedSession = await Session.findByIdAndRemove(sessionId);

    if (!deletedSession) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.json({ message: 'Session deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})


// const createSessions = async (startDate, endDate, sessionTime) => {
//   for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {

//     const sessionDateTime = new Date(date);
//     const [hours, minutes] = sessionTime.split(':');
//     sessionDateTime.setHours(parseInt(hours, 10));
//     sessionDateTime.setMinutes(parseInt(minutes, 10));


//     const newSession = new Session({
//       date: sessionDateTime,
//     });


//     await newSession.save();
//   }
// };

// // Schedule the session creation script to run once per week on a specific day and time (adjust as needed)
// cron.schedule("0 0 * * MON", () => {
//   const startDate = new Date();
//   startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
//   const endDate = new Date(startDate);
//   endDate.setDate(endDate.getDate() + 4);
//   const sessionTime = '06:00';

//   createSessions(startDate, endDate, sessionTime)
// })


export default sessionRoute
export { Session }