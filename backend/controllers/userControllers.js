const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc        register new user
// @route       POST /api/users
// @access      public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("All fields are required!");
    }
    // check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists!");
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id, user.isAdmin),
        });
    } else {
        res.status(500);
        throw new Error("User registration failed!");
    }
});

// @desc        login user
// @route       POST /api/users/login
// @access      public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id, user.isAdmin),
        });
    } else {
        res.status(400);
        throw new Error("Invalid credential!");
    }
});

// @desc        get user data of current login user
// @route       GET /api/users/me
// @access      private
const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email, isAdmin } = req.user;
    res.status(200).json({ user: { _id, name, email, isAdmin } });
});

// @desc        get user data user Id
// @route       GET /api/users/:id
// @access      private
const getUser = asyncHandler(async (req, res) => {
    if (!req.user.isAdmin) {
        res.status(400);
        throw new Error("Not authorized!");
    }
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
        res.status(400);
        throw new Error("User not found!");
    }
    res.status(200).json(user);
});

// @desc        get all users
// @route       GET /api/users
// @access      private
const getUsers = asyncHandler(async (req, res) => {
    if (!req.user.isAdmin) {
        res.status(400);
        throw new Error("Not authorized!");
    }
    const users = await User.find().select("-password");
    res.status(200).json({ users });
});

// @desc        update current user
// @route       PUT /api/users/me
// @access      private
const updateMe = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    res.json({ message: `update user by ID ${userId}` });
});

// @desc        update user data
// @route       PUT /api/users/:id
// @access      private
const updateUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    res.json({ message: `update user by ID ${userId}` });
});

// @desc        delete user
// @route       DELETE /api/users/:id
// @access      private
const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    res.json({ message: `delete user by ID ${userId}` });
});

const generateToken = (id, isAdmin) => {
    return jwt.sign({ id, isAdmin }, process.env.JWT_KEY, {
        expiresIn: "1d",
    });
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
    getUser,
    getUsers,
    updateMe,
    updateUser,
    deleteUser,
};
