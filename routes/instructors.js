import express from "express"
const router = express.Router()

router.get('/', (req, res) => {
    res.send({ data: 'Here is your data'})
})
router.post('/', (req, res) => {
    res.send({ data: 'Instructor created'})
})
router.put('/', (req, res) => {
    res.send({ data: 'Instructor updated'})
})
router.delete('/', (req, res) => {
    res.send({ data: 'Instructor deleted'})
})


export default router