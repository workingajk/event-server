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
    res.send("home");
});



app.listen(port, () => {
    console.log("server runnign...");
});
