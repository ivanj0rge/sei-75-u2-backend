import 'dotenv/config'
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import instructorsRoute from './routes/instructors.js'
import studentsRoute from './routes/students.js'
import sessionRoute from './routes/sessions.js'
import eventsRoute from './routes/events.js'
import notificationsRoute from './routes/notifications.js'



const app = express();

app.use(cors());
app.use(bodyParser.json())

mongoose.connect(process.env.DATABASE_URL,{
useNewUrlParser: true,
useUnifiedTopology: true,
})

const port = process.env.PORT || 3000
app.listen(port, () => {console.log(`Listening on port: ${port}`)})

app.use('/instructors', instructorsRoute)
app.use('/students', studentsRoute)
app.use('/sessions', sessionRoute)
app.use('/events', eventsRoute)
app.use('/notifications', notificationsRoute)

