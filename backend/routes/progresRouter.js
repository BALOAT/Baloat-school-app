const express = require('express');
const isAuthenticated = require('../middlewares/isAuth');
const progressController = require('../controllers/progressCtrl');
const { isStudent } = require('../middlewares/roleAccesMiddleware');
const progressRouter = express.Router();

// note inside the progressRouter we have all put, post, delete, get there
progressRouter.post("/api/v1/progress", isAuthenticated, isStudent, progressController.applyToCourse);
progressRouter.put("/api/v1/progress/start-section", isAuthenticated, isStudent, progressController.startSection);
progressRouter.put("/api/v1/progress/update", isAuthenticated, isStudent, progressController.update);

module.exports = progressRouter;