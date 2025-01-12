const Joi = require('joi');
const express = require('express');
const multer = require('multer')
const path = require('path');


const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
        
        const newFileName = file.fieldname + "_" + uniqueSuffix + path.extname(file.originalname); 
        cb(null, newFileName); 
        // cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const upload = multer({ storage: storage });

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


router.post('/', upload.single('image'), async(req, res) => {

    const {error} = validateCustomer(req.body);
    if( error ){ return res.status(400).send(`${error.message}`) }

    req.body.name = req.body.name
    .split(' ') // Split the string into an array of words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(' '); // Join the words back into a string
    
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    // res.json({ message: 'Image uploaded successfully!', filename: req.file.filename });

    req.body.image = req.file.filename;

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