import express, { Router } from "express"
import serverless from "serverless-http"
import 'dotenv/config'
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import instructorsRoute from '../routes/instructors.js'
import studentsRoute from './routes/students.js'
import sessionRoute from './routes/sessions.js'
import eventsRoute from './routes/events.js'
import notificationsRoute from './routes/notifications.js'
import loginRoute from './routes/login.js'

const api = express();

api.use(cors());
api.use(bodyParser.json())

const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"))


mongoose.connect(process.env.DATABASE_URL,{
useNewUrlParser: true,
useUnifiedTopology: true,
})

router.use('/instructors', instructorsRoute)
router.use('/students', studentsRoute)
router.use('/sessions', sessionRoute)
router.use('/events', eventsRoute)
router.use('/notifications', notificationsRoute)
router.use('/login', loginRoute)

api.use("/api/", router);

export const handler = serverless(api)
 