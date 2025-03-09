const express = require("express");
const isAuthenticated = require("../middlewares/isAuth");
const courseSectionCtrl = require("../controllers/courseSection");


const courseSectionRouter = express.Router();



courseSectionRouter.post("/create", isAuthenticated, courseSectionCtrl.create);
courseSectionRouter.get("/", courseSectionCtrl.lists);
// courseSectionRouter.put("api/v1/course-section/create/:sectionId", isAuthenticated, courseSectionCtrl.update);
// courseSectionRouter.get("api/v1/course-section/create/:sectionId", courseSectionCtrl.lists);
// courseSectionRouter.delete("api/v1/course-section/create/:sectionId", isAuthenticated, courseSectionCtrl.delete);



module.exports = courseSectionRouter;