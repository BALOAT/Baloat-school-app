const express = require ('express');
const isAuthenticated = require('../middlewares/isAuth');
const courseCtrl = require("../controllers/course")
const courseRouter = express.Router();

// note inside the courseRouter we have all put, ost, delete, get there
courseRouter.post("/create", isAuthenticated, courseCtrl.create);
courseRouter.get("/lists", courseCtrl.lists);
courseRouter.get("/:courseId", courseCtrl.getCourseById);
courseRouter.put("/:courseId", courseCtrl.update);
courseRouter.delete("/:courseId", courseCtrl.delete);


module.exports = courseRouter;