const express = require('express');
const isAuthenticated = require('../middlewares/isAuth');
const courseCtrl = require("../controllers/course");
const { isInstructor } = require('../middlewares/roleAccesMiddleware');
const courseRouter = express.Router();

// note inside the courseRouter we have all put, ost, delete, get there
courseRouter.post("/create", isAuthenticated, isInstructor, courseCtrl.create);
courseRouter.get("/lists", courseCtrl.lists);
courseRouter.get("/:courseId", courseCtrl.getCourseById);
courseRouter.put("/:courseId", isAuthenticated, isInstructor, courseCtrl.update);
courseRouter.delete("/:courseId", isAuthenticated, isInstructor, courseCtrl.delete);


module.exports = courseRouter;