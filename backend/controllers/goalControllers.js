const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// @desc        get goals
// @route       GET /api/goals
// @access      private
const getGoals = asyncHandler(async (req, res) => {
    try {
        const goals = req.user.isAdmin
            ? await Goal.find()
            : await Goal.find({ user: req.user.id });
        res.status(200).json(goals);
    } catch (error) {
        throw error;
    }
});

// @desc        set goal
// @route       POST /api/goals
// @access      private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.title) {
        // return res.status(400).json({ message: "Enter title of goal" });
        res.status(400);
        throw new Error("Enter the title of the goal");
    }
    if (!req.body.description) {
        // return res.status(400).json({ message: "Enter the description for the goal" });
        res.status(400);
        throw new Error("Enter the description of the goal");
    }
    try {
        const goal = await Goal.create({
            title: req.body.title,
            description: req.body.description,
            user: req.user.id,
        });
        res.status(200).json(goal);
    } catch (error) {
        throw error;
    }
});

// @desc        get goals
// @route       PUT /api/goals/:id
// @access      private
const updateGoal = asyncHandler(async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);
        if (!goal) {
            res.status(404);
            throw new Error("Goal not found!");
        }
        // check user
        const user = await User.findById(req.user.id);
        if (!user) {
            res.status(401);
            throw new Error("User not found!");
        }
        // make sure logged in user matches the goal user
        if (goal.user.toString() !== user.id && !user.isAdmin) {
            res.status(401);
            throw new Error("User not authorized!");
        }
        const updatedGoal = await Goal.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedGoal);
    } catch (error) {
        throw error;
    }
});

// @desc        get goals
// @route       DELETE /api/goals/:id
// @access      private
const deleteGoal = asyncHandler(async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);
        if (!goal) {
            res.status(404);
            throw new Error("Goal not found!");
        }
        // check user
        const user = await User.findById(req.user.id);
        if (!user) {
            res.status(401);
            throw new Error("User not found!");
        }
        // make sure logged in user matches the goal user
        if (goal.user.toString() !== user.id && !user.isAdmin) {
            res.status(401);
            throw new Error("User not authorized!");
        }
        await goal.deleteOne();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        throw error;
    }
});

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };
