const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Enter name of user"],
        },
        email: {
            type: String,
            required: [true, "Enter email of user"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Enter password of user"],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
