const express = require("express");
const router = express.Router();
const {
    getUser,
    getUsers,
    registerUser,
    updateUser,
    deleteUser,
    loginUser,
    getMe,
    updateMe,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getUsers).post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(protect, getMe).put(protect, updateMe);
// router.get("/me", protect, getMe);
// router.put("/me", protect, updateMe);
router
    .route("/:id")
    .get(protect, getUser)
    .put(protect, updateUser)
    .delete(protect, deleteUser);

module.exports = router;
