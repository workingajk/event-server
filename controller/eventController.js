const event = require("../models/eventModel");

exports.addEvent = async (req, res) => {
    const { title, date, location, participants, status } = req.body;

    try {
        if (participants.length == 0) {
            res.status(400).json({ message: "participants must not be empty" });
            return;
        }

        const newEvent = await event.create({
            title,
            date,
            location,
            participants,
            status,
        });

        res.status(201).json({ message: "Event created", newEvent });
    } catch (err) {
        // if (err.name === "ValidationError") {
        //     return res.status(400).json({
        //         message: "Invalid event data",
        //         errors: Object.fromEntries(
        //             Object.entries(err.errors).map(([field, error]) => [
        //                 field,
        //                 error.message,
        //             ]),
        //         ),
        //     });
        // }

        console.error("Error creating event:", err);
        res.status(500).json({ message: "Server Error", err });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await event.find({ ...req.query }).sort({ date: 1 });
        res.status(200).json({ message: "events", events });
    } catch (err) {
        res.status(500).json({ message: "Server Error", err });
    }
};


exports.updateEvent = async (req, res) => {
    const { id } = req.params;
    const {
        title,
        date,
        location,
        status,
        addParticipant,
        removeParticipant
    } = req.body;

    try {
        const updateQuery = {};

        // Update normal fields
        if (title !== undefined) updateQuery.title = title;
        if (date !== undefined) updateQuery.date = date;
        if (location !== undefined) updateQuery.location = location;
        if (status !== undefined) updateQuery.status = status;

        const updateOperations = {};

        if (Object.keys(updateQuery).length > 0) {
            updateOperations.$set = updateQuery;
        }

        // Add a participant
        if (addParticipant !== undefined) {
            updateOperations.$push = {
                participants: addParticipant
            };
        }

        // Remove a participant
        if (removeParticipant !== undefined) {
            updateOperations.$pull = {
                participants: removeParticipant
            };
        }

        const updatedEvent = await event.findByIdAndUpdate(
            id,
            updateOperations,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedEvent) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json({
            message: "Event updated",
            updatedEvent
        });

    } catch (err) {
        res.status(500).json({
            message: "Server Error",
            err
        });
    }
};


exports.deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const existingEvent = await event.findById(id);

        if (!existingEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (existingEvent.status !== "cancelled") {
            return res.status(400).json({
                message: 'Only events with status "cancelled" can be deleted',
            });
        }

        const deletedEvent = await event.findByIdAndDelete(id);
        res.status(200).json({ message: " event deleted", deletedEvent });
    } catch (err) {
        res.status(500).json({ message: "Server Error", err });
    }
};
