import express from "express"
const router = express.Router()

router.get('/', (req, res) => {
    res.send({ data: 'Here is your data'})
})
router.post('/', (req, res) => {
    res.send({ data: 'Session data created'})
})
router.put('/', (req, res) => {
    res.send({ data: 'Session data updated'})
})
router.delete('/', (req, res) => {
    res.send({ data: 'Session data deleted'})
})


export default router