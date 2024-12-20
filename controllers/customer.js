const Joi = require('joi');
const express = require('express');
const router = express.Router();

const customerModal = require('../modals/customer');

router.get('/', async(req, res) => {
    const rows = await customerModal.findAll();
    res.send(rows);
});

router.get('/:id', async(req, res) => {
    const id = req.params.id;
    const rows = await customerModal.findById(id);
    res.send(rows);
});


router.post('/', async(req, res) => {

    const {error} = validateCustomer(req.body);
    if( error ){ return res.status(400).send(`${error.message}`) }

    req.body.name = req.body.name
    .split(' ') // Split the string into an array of words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(' '); // Join the words back into a string
    
    await customerModal.create(req.body);
    res.status(201).send("Operation Done");
});


router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const {error} = validateCustomer(req.body);
    if( error ){ return res.status(400).send(`${error.message}`) }

    await customerModal.update(req.body, id);
    res.status(200).send("Operation Done");   
});

router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    await customerModal.deleteById(id);
    res.send("Operation Done.");
});



const validateCustomer = (customer) => {
    const schema = Joi.object({
        name: Joi.string().required().min(1).label('Name'),
        phone: Joi.string().required(),
        email: Joi.string().required(),
        image: Joi.string(),
        is_deleted: Joi.boolean()
    });

    return schema.validate(customer)
}


module.exports = router;