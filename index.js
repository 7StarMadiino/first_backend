require('dotenv').config()

const express = require('express');
var cors = require('cors');
require('express-async-errors');


// controllers
const roomController = require('./controllers/room');
const customerController = require('./controllers/customer');
const bookingController = require('./controllers/booking');
const marketRoomsController = require('./controllers/market_rooms');
const marketController = require('./controllers/market');
const hallController = require('./controllers/hall');


const app = express();
app.use(cors({
    origin: "*"
}))

app.use(express.json());


// error handler
app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).send(`Something went wrong. ${err}`);
})

// routes USE
app.use('/api/customers', customerController);
app.use('/api/market_rooms', marketRoomsController);
app.use('/api/rooms', roomController);
app.use('/api/booking', bookingController);
app.use('/api/markets', marketController);
app.use('/api/halls', hallController);


const port = process.env.PORT || 9050;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})