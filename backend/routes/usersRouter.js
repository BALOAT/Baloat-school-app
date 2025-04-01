const express = require('express');
const usersCtrl = require("../controllers/users");
const isAuthenticated = require('../middlewares/isAuth');
const { isAdmin } = require('../middlewares/roleAccesMiddleware');
const usersRouter = express.Router();

// note inside the usersRouter we have all put, post, delete, get there
usersRouter.post("/api/v1/users/register", usersCtrl.register);
usersRouter.post("/api/v1/users/login", usersCtrl.login);
usersRouter.get("/api/v1/users/public-profile/:courseId", usersCtrl.profilePublic);
usersRouter.get("/api/v1/users/private-profile/", isAuthenticated, isAdmin, usersCtrl.profilePrivate);
usersRouter.get("/api/v1/users/position/:courseId", usersCtrl.lists);



module.exports = usersRouter