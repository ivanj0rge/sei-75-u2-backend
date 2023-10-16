import express, { Router } from "express";
import serverless from "serverless-http";
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

const router = Router();

api.use(cors());
api.use(bodyParser.json())

mongoose.connect(process.env.DATABASE_URL,{
useNewUrlParser: true,
useUnifiedTopology: true,
})

api.use('/instructors', instructorsRoute)
api.use('/students', studentsRoute)
api.use('/sessions', sessionRoute)
api.use('/events', eventsRoute)
api.use('/notifications', notificationsRoute)
api.use('/login', loginRoute)

api.use("/api/", router);
export const handler = serverless(api);