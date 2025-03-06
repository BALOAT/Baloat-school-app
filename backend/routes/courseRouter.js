const express = require ('express');
const isAuthenticated = require('../middlewares/isAuth');
const courseCtrl = require("../controllers/course")
const courseRouter = express.Router();

// note inside the courseRouter we have all put, ost, delete, get there
courseRouter.post("/api/v1/courses/create", isAuthenticated, courseCtrl.create);
courseRouter.get("/api/v1/courses/lists", courseCtrl.lists);
courseRouter.get("/api/v1/courses/:courseId", courseCtrl.getCourseById);
courseRouter.put("/api/v1/courses/:courseId", courseCtrl.update);
courseRouter.delete("/api/v1/courses/:courseId", courseCtrl.delete);


module.exports = courseRouter;