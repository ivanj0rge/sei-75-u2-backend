import express from "express"
const router = express.Router()

router.get('/', (req, res) => {
    res.send({ data: 'Here is your data'})
})
router.post('/', (req, res) => {
    res.send({ data: 'Student created'})
})
router.put('/', (req, res) => {
    res.send({ data: 'Student updated'})
})
router.delete('/', (req, res) => {
    res.send({ data: 'Student deleted'})
})


export default router