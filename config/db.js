require("dotenv").config();

const atlas = process.env.atlas 
const mongoose = require("mongoose");

mongoose
    .connect(atlas)
    .then(() => {
        console.log("atlas connection established");
    })
    .catch((err) => {
        console.log("error connecting atlas", err);
    });
