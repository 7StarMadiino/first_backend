const Joi = require('joi');
const express = require('express');

const router = express.Router();

const marketRooms = require('../modals/market_rooms');

router.get('/', async (req, res) => {
    const rows = await marketRooms.findAllMarketRooms();
    res.send(rows);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const row = await marketRooms.findById(id);
    res.send(row);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await marketRooms.deleteById(id);
    res.send("Operation Done.");
});

router.post('/', async(req, res) => {

    const {error} = validateRoom(req.body);
    if( error ){ return res.status(400).send(`${error.message}`) }

    req.body.name = req.body.name
    .split(' ') // Split the string into an array of words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(' '); // Join the words back into a string

    await marketRooms.create(req.body);
    res.status(201).send("Operation Done");
});

router.put('/:id', async(req, res) => {
    
    const {error} = validateRoom(req.body);
    if( error ){ return res.status(400).send(`${error.message}`) }
    
    const id = req.params.id;
    await marketRooms.update(req.body, id);
    res.status(200).send("Operation Done");
});

router.put('/:id/status', async(req, res) => {
    const id = req.params.id;
    await marketRooms.updateStatus(id);
    res.status(200).send("Operation Done");
});



const validateRoom = (room) => {
    const schema = Joi.object({
        name: Joi.string().required().min(1).label('Name'),
        status: Joi.boolean(),
        is_deleted: Joi.boolean()
    });

    return schema.validate(room)
}


module.exports = router;