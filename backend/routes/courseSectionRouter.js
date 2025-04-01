const express = require("express");
const isAuthenticated = require("../middlewares/isAuth");
const courseSectionCtrl = require("../controllers/courseSection");
const { isInstructor } = require("../middlewares/roleAccesMiddleware");


const courseSectionRouter = express.Router();



courseSectionRouter.post("/create/:courseId", isAuthenticated, isInstructor, courseSectionCtrl.create);
courseSectionRouter.get("/", courseSectionCtrl.lists);
courseSectionRouter.put("/create/:sectionId", isAuthenticated, isInstructor, courseSectionCtrl.update);
courseSectionRouter.get("/:sectionId", courseSectionCtrl.getSection);
courseSectionRouter.delete("/:sectionId", isAuthenticated, isInstructor, courseSectionCtrl.delete);



module.exports = courseSectionRouter;