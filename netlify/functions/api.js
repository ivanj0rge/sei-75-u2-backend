import express, { Router } from "express"
import serverless from "serverless-http"
import 'dotenv/config'
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import instructorsRoute from '../../routes/instructors'
import studentsRoute from '../../routes/students'
import sessionRoute from '../../routes/sessions'
import eventsRoute from '../../routes/events'
import notificationsRoute from '../../routes/notifications'
import loginRoute from '../../routes/Login'

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
 