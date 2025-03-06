const asyncHandler = require("express-async-handler");
const Course = require("../model/Course");
const mongoose = require("mongoose");
const CourseSection = require("../model/CourseSection");
const User = require("../model/User");



const courseSectionCtrl = {
  // ! Find the user
  create: asyncHandler(async (req, res) => {
    const userFound = await User.findById(req.user);
    if (!userFound) {
      res.status(404);
      throw new Error("User not found");
    }
    // if (userFound.role !== "instructor") {
    //   res.status(401);
    //   throw new Error(
    //     "You are not authorized to create, instructors only"
    //   );
    // }

    //! Get the section name
    const { sectionName } = req.body;
    // ! Get the courseID
    const { courseId } = req.params;
    // ! Validate the courseId
    if (!mongoose.isValidObjectId(courseId)) {
      throw new Error("Inalid course ID");
    }
    // ! Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }
    // ! Validate the section name
    if (!sectionName) {
      throw new Error("Please provide section name");
    }
    // ! Create the course section
    const sectionCreated = await CourseSection.create({
      sectionName,
      user: req.user,
    });
    // ! Add course section to a course
    course.sections.push(sectionCreated._id);
    // ! resave 
    await course.save();
    res.json({
      message: "Section created successfully",
      data: sectionCreated,
      status: "success",
    });
  }),

  // ! Lists
  lists: asyncHandler(async (req, res) => {
    const courseSections = await CourseSection.find();
    res.json(courseSections);
  }),

  //  ! get a single course section
  getSection: asyncHandler(async (req, res) => {
    const courseSection = await CourseSection.findById(req.params.courseId);
    res.json(courseSection);
    if (courseSection) {
      res.json(courseSection);
    } else {
      res.status(400);
      throw new Error("Section not found");
    }
  }),

  //  ! update
  update: asyncHandler(async (req, res) => {
    const section = await CourseSection.findByIdAndUpdate(
      req.params.sectionId,
      req.body,
      { new: true }
    );
    if (section) {
      res.json(section);
    } else {
      res.status(404);
      throw new Error("Section not found");
    }

  }),


  //  ! delete
  delete: asyncHandler(async (req, res) => {
    //  ! find the section to be deleted
    const sectionFound = await CourseSection.findById(req.params.sectionId);

    if (!sectionFound) {
      res.status(404);
      res.json({ message: "Section not found" });
      return;
    }
    // ! Find the course associated wtih the section to check for enrolled students
    const course = await Course.findOne({
      sections: req.params.sectionId
    }).populate("students");
    if (!course) {
      res.status(404).json({ message: "Associated course not found" });
    }

    // ! Check if the  course has any students enrolled
    if (course.students.length > 0) {
      res.status(400).json({
        message: "Associated course has students, cannot delete section",
      });
      return;
    }
    // ! Proceed to delete 
    await CourseSection.findByIdAndDelete(req.params.sectionId);

    // ! Remove the section from the course's secction array
    await Course.findByIdAndUpdate(course._id, {
      $pull: { sections: req.params.sectionId },
    });
    res.json({ message: "Section deleted successfully" });
  }),


};

module.exports = courseSectionCtrl;
