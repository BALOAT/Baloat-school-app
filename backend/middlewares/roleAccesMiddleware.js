const User = require("../model/User");

// ! Role checking function

// !---Admin Role----
const isAdmin = async (req, res, next) => {
    // console.log(req.user);
    // ! Find the user in DB
    const user = await User.findById(req.user);
    if (user.role !== "admin")
        return res.status(403).json({ message: "Access denied: Admin only." });
    next();
};

// !---Student Role----
const isStudent = async (req, res, next) => {
    // console.log(req.user);
    // ! Find the user in DB
    const user = await User.findById(req.user);
    if (user.role !== "student")
        return res.status(403).json({ message: "Access denied: Student only." });
    next();
};

// !---Instructor Role----
const isInstructor = async (req, res, next) => {
    // console.log(req.user);
    // ! Find the user in DB
    const user = await User.findById(req.user);
    if (user.role !== "instructor")
        return res.status(403).json({ message: "Access denied: Instructor only." });
    next();
};




module.exports = { isAdmin, isStudent, isInstructor };