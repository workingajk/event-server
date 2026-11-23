const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    participants: { type: [String] },
    status: {
        type: String,
        enum: ["scheduled", "completed", "cancelled"],
        required: true,
        default: "scheduled",
    },
});

module.exports = mongoose.model("Event", eventSchema);
