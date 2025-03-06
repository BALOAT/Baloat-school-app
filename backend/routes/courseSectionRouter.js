const express = require("express");
const isAuthenticated = require("../middlewares/isAuth");
const courseSectionCtrl = require("../controllers/courseSection");


const courseSectionRouter = express.Router();



courseSectionRouter.post("api/v1/course-section/create", isAuthenticated, courseSectionCtrl.create);
courseSectionRouter.get("api/v1/course-section", courseSectionCtrl.lists);
// courseSectionRouter.put("api/v1/course-section/create/:sectionId", isAuthenticated, courseSectionCtrl.update);
// courseSectionRouter.get("api/v1/course-section/create/:sectionId", courseSectionCtrl.lists);
// courseSectionRouter.delete("api/v1/course-section/create/:sectionId", isAuthenticated, courseSectionCtrl.delete);



module.exports = courseSectionRouter;