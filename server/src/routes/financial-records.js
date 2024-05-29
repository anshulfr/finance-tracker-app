import express from 'express';
import financialRecordModel from '../schema/financial-record.js';
const router = express.Router();

router.get('/getAllByUserID/:userId', async (req, res) => {
    try {
        const userID = req.params.userId;
        const records = await financialRecordModel.find({ userID: userID })
        if (records.length === 0) {
            return res.status(404).send('No records found')
        }
        res.status(200).send(records)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.post('/', async (req, res) => {
    try {
        const newRecordBody = req.body;
        const newRecord = new financialRecordModel(newRecordBody);
        const savedRecord = await newRecord.save();

        res.status(200).send(savedRecord)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const newRecordBody = req.body;
        const record = await financialRecordModel.findByIdAndUpdate(id, newRecordBody, { new: true })

        if (!record) return res.status(404).send('No record found')
        res.status(200).send(record)

    } catch (err) {
        res.status(500).send(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const record = await financialRecordModel.findByIdAndDelete(id)
        if (!record) return res.status(404).send('No record found')
        res.status(200).send(record)
    } catch (err) {
        res.status(500).send(err)
    }
})

export default router;