const Joi = require('joi');
const express = require('express');
const router = express.Router();

const customerModal = require('../modals/customer');
const roomModal = require('../modals/room');

router.get('/', async (req, res) => {
    const rows = await customerModal.findAllBooking();
    res.send(rows);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const rows = await customerModal.findBookingById(id);
    res.send(rows);
});

router.post('/', async(req, res) => {
      
    const {error} = validateBooking(req.body);
    if( error ){ return res.status(400).send(`${error.message}`) }

    await customerModal.makeBooking(req.body);
    await roomModal.updateStatus(req.body.room_id);
    res.status(201).send("Operation Done");
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;

    const {error} = validateBooking(req.body);
    if( error ){ return res.status(400).send(`${error.message}`) }
    
    await customerModal.updateBooking(req.body, id);
    await roomModal.updateStatus(req.body.room_id);
    res.send("Operation Done");
});


router.put('/:id/status', async(req, res) => {
    const id = req.params.id;
    await customerModal.updateBookingStatus(id)
    await roomModal.updateStatus(req.body.room_id);
    res.send("Operation Done");
});


const validateBooking = (room) => {
    const schema = Joi.object({
        customer_id: Joi.number().required(),
        room_id: Joi.number().required(),
        booking_date: Joi.date().required(),
        time_in: Joi.string().required(),
        time_out: Joi.string().required(),
        status: Joi.boolean().required(),
        is_deleted: Joi.boolean().required()
    });

    return schema.validate(room)
};


module.exports = router;