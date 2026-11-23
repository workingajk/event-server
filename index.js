require('dotenv').config()
const express = require("express");
const cors = require('cors')
const port = process.env.PORT || 3000
const eventRoute = require('./router/eventRoute')

require('./config/db')
const app = express();



app.use(cors())
app.use(express.json())

app.use(eventRoute)

app.get("/", (req, res) => {
    res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Event Server</title>
        </head>
        <body>
            <h1>Welcome to the Event Server</h1>
            <ul>
            <li>router.post('/addEvent',eventController.addEvent)</li>
            <li>router.get('/getEvents',eventController.getEvents)</li>
            <li>router.put('/updateEvent/:id',eventController.updateEvent)</li>
            <li>router.delete('/deleteEvent/:id',eventController.deleteEvent)</li>
            </ul>
        </body>
        </html>`);
});



app.listen(port, () => {
    console.log("server runnign...");
});
