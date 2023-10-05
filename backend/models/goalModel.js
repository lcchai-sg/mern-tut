const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Enter title of the goal"],
        },
        description: {
            type: String,
            required: [true, "Enter description of the goal"],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Goal", goalSchema);
