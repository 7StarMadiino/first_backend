const Joi = require('joi');
const express = require('express');
const router = express.Router();

const hallModal = require('../modals/hotel_halls');


router.get('/', async(req, res)=> {
    const rows = await hallModal.findAll();
    res.send(rows);
});

router.post('/', async(req, res) => {

    const {error} = validateHallInfo(req.body);
    if( error ){ return res.status(400).send(`${error.message}`) }

    req.body.name = req.body.name
    .split(' ') // Split the string into an array of words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(' '); // Join the words back into a string

    await hallModal.create(req.body);
    res.send("Operation Done.");

});

router.put('/:id', async(req, res) => {
    const id = req.params.id;

    const {error} = validateHallInfo(req.body);
    if( error ){ return res.status(400).send(`${error.message}`) }

    await hallModal.update(req.body, id);
    res.send("Operation Done.");

});

router.put('/:id/status', async(req, res) => {
    const id = req.params.id;
    await hallModal.updateStatusOut(id);
    res.send("Operation Done.");
});



const validateHallInfo = (customer) => {
    const schema = Joi.object({
        name: Joi.string().required().min(1).label('Name'),
        phone: Joi.string().required(),
        event_date: Joi.date().required(),
        amount: Joi.number().required(),
        paid: Joi.number().required(),
        created_at: Joi.date().required(),
        status: Joi.boolean().required(),
        is_deleted: Joi.boolean().required()
    });

    return schema.validate(customer)
}


module.exports = router;