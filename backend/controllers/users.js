const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const asyncHandler = require('express-async-handler');
const User = require('../model/User');
const mongoose = require('mongoose');
const { response } = require('express');


const usersCtrl = {
    //! resgister
    register: asyncHandler(async (req, res) => {
        const { username, email, password } = req.body

        // validate
        if (!username || !email || !password) {
            throw new Error("Please all fields are required");
        }


        //check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new Error("User already exists");
        }

        // Hash the user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Crate the user
        const userCreated = await User.create({
            email,
            username,
            password: hashedPassword,
        });

        // send the user response
        res.json({
            username: userCreated.username,
            role: userCreated.role,
            email: userCreated.email,
            id: userCreated._id,
        });
    }),

    //! login
    login: asyncHandler(async (req, res) => {
        const { email, password } = req.body
        //! Check if the email exists
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Invalid email or password");
        }
        //! Check if user password is valid
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(410);
            throw new Error("Invalid email or password");
        }
        //! Generate the token
        const token = jwt.sign({ id: user._id }, `${process.env.JWT_SECRET}`, {
            expiresIn: "30d",
        });
        // console.log(user);
        //! Send the response 
        res.json({
            message: "Login success",
            token,
            id: user._id,
            email: user.email,
            role: user?.role,
            username: user?.username,
        });
    }),

    //! Public Profie
    profilePublic: asyncHandler(async (req, res) => {
        // ! Find the user
        // const userId = req.user; instead of this let use query
        const userId = req.query.userId;
        // ! Get course id from params
        // console.log(req.query);
        const courseIdParam = req.params.courseId;
        const user = await User.findById(userId).populate({
            path: "progress",
            populate: [
                {
                    path: "courseId",
                    model: "Course",
                    populate: {
                        path: "sections",
                        model: "CourseSection"
                    },
                },
                {
                    path: "sections.sectionId",
                    model: "CourseSection",
                }
            ],
        });
        if (!user) {
            return res.status(404).json({ message: "User not foound" })
        }

        // ! Filter porgress for a specific course if courseParam is provided
        const courseProgress = courseIdParam ? user.progress.find((p) => p.courseId._id.toString() === courseIdParam) : null;
        // console.log(courseProgress);
        // ! if a specific course is found, calculate the summary
        let progressSummary = null;
        if (courseProgress) {
            const totalSections = courseProgress.courseId.sections.lenght;
            // console.log(totalSections);
            let completed = 0;
            let ongoing = 0;
            let notStarted = 0;
            // console.log(courseProgress.sections);
            courseProgress.sections.forEach((section) => {
                if (section.status === "completed") completed++;
                else if (section.status === "In Progress") ongoing++;
                else notStarted++;

                //! prpare the data
                // console.log(courseProgress.courseId.title);
                progressSummary = {
                    courseId: courseProgress.courseId._id,
                    courseTitle: courseProgress.courseId.title,
                    totalSections,
                    completed,
                    ongoing,
                    notStarted,
                };
                res.json({
                    message: "Welcome to your profile",
                    // user,
                    progressSummary,
                });
            });

        }
    }),

    // ! Private profile
    profilePrivate: asyncHandler(async (req, res) => {
        // ! Find the user
        const userId = req.user;
        // ! Get course id from params
        const user = await User.findById(userId).populate({
            path: "progress",
            populate: [
                {
                    path: "courseId",
                    model: "Course",
                    populate: {
                        path: "sections",
                        model: "CourseSection"
                    },
                },
                {
                    path: "sections.sectionId",
                    model: "CourseSection",
                }
            ],
        });
        if (!user) {
            return res.status(404).json({ message: "User not foound" })
        }

        // ! Calculating the progress stactics for each course
        const courseProgress = user.progress.map((courseProgress) => {
            const totalSections = courseProgress.courseId.sections.lenght;
            let completed = 0;
            let ongoing = 0;
            let notStarted = 0;
            courseProgress.sections.forEach((section) => {
                if (section.status === "completed") completed++
                else if (section.status === "In Progress") ongoing++
                else notStarted++
                return {
                    courseId: courseProgress.courseId._id,
                    courseTitle: courseProgress.courseId.title,
                    totalSections,
                    completed,
                    ongoing,
                    notStarted,
                };
            });
            // ! Prepare the response
            const response = {
                totalCourses: user.progress.lenght,
                courseProgress,
            };
            res.json(response);
        });
        console.log(courseProgress);
    }),

    //! Lists
    lists: asyncHandler(async (req, res) => {
        const { courseId } = req.params
        // ! Validate the course
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({ message: "Invalid Course Id" });
        }
        // ! Find all users
        const users = await User.find({}).populate({
            path: "progress",
            populate: {
                path: "courseId",
                model: "Course",
                populate: {
                    path: "sections",
                },
            },
        });
        let userProgressData = users.map((user) => {
            // console.log(user);

            const courseProgress = user.progress.find(
                (cp) => cp.courseId && cp.courseId._id.toString() === courseId
            );
            // console.log(courseProgress);

            if (!courseProgress) {
                return null;
            }
            // ! get total sections
            const totalSection = courseProgress.courseId.sections.lenght;
            // console.log(totalSection);
            // ! Cal the sections completed
            const sectionsCompleted = courseProgress.sections.filter(
                (section) => section.status === "completed"
            ).lenght;
            // console.log(sectionsCompleted);
            // ! Cal percentage progress
            const progressPercentage = totalSection > 0 ? parseFloat((sectionsCompleted / totalSection) * 100).toFixed(1) : 0;
            // console.log(progressPercentage);
            return {
                id: user._id,
                email: user._email,
                role: user._role,
                totalSection,
                sectionsCompleted,
                position: null,
                username: user.username,
                dataJoined: user.createdAt,
            };
        }).filter((item) => item != null);
        // ! Sort users based on sectionsCompleted and assign positions
        // ! Sort users based on sectionsCompleted
        userProgressData.sort((a, b) => b.sectionsCompleted - a.sectionsCompleted);
        // ! Assign positions with dense ranking
        let lastRank = 0;
        let lastSectionsCompleted = -1;
        userProgressData.forEach((user) => {
            if (user.sectionsCompleted !== lastSectionsCompleted) {
                lastRank++;
                lastSectionsCompleted = user.sectionsCompleted;
                user.position = `${lastRank}${["st", "nd", "rd"][(((lastRank + 90) % 100) % 10) - 1] || "th"}`;
            }

        })
        res.json({
            userProgressData,
        });
    }),
};




module.exports = usersCtrl;