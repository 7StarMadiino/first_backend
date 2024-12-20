const Joi = require('joi');
const express = require('express');
const router = express.Router();


const registerMarketModal = require('../modals/market');
const marketRoomsModal = require('../modals/market_rooms');

router.get('/', async(req, res) => {
    const rows = await registerMarketModal.findAllMarket();
    res.send(rows);
});

router.get('/:id', async(req, res) => {
    const id = req.params.id;
    const row = await registerMarketModal.findMarketById(id);
    res.send(row);
});

router.post('/', async(req, res) => {

    const {error} = validateMarketBooking(req.body);
    if( error ){ return res.status(400).send(`${error.message}`) };

    req.body.business_type = req.body.business_type
    .split(' ') // Split the string into an array of words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(' '); // Join the words back into a string

    await registerMarketModal.create(req.body);
    await marketRoomsModal.updateStatus(req.body.room_id);
    res.status(201).send("Operation Done");

});

router.put('/:id/status', async(req, res) => {
    const id = req.params.id;

    const {error} = validateStatusOut(req.body);
    if( error ){ return res.status(400).send(`${error.message}`) };

    const info = await registerMarketModal.findMarketById(id);
    const obj = info[0];
    const room_id = obj.room_id;

    await registerMarketModal.updateStatusOut(req.body.date_out, id);
    await marketRoomsModal.updateStatus(room_id);
    res.status(200).send("Operation Done");
})


const validateMarketBooking = (market) => {
    const schema = Joi.object({
        customer_id: Joi.number().required(),
        room_id: Joi.number().required(),
        business_type: Joi.string().required(),
        date_in: Joi.date().required(),
        date_out: Joi.date().required(),
        status: Joi.boolean(),
        is_deleted: Joi.boolean()
    });

    return schema.validate(market)
};


const validateStatusOut = (dateOut) => {
    const schema = Joi.object({
        date_out: Joi.date().required()
    });
    return schema.validate(dateOut)
};


module.exports = router;