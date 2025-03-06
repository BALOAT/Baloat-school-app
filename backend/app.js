require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/usersRouter");
const courseRouter = require("./routes/courseRouter");
const courseSectionRouter = require("./routes/courseSectionRouter");
const app = express();
const PORT = process.env.PORT || 5000


// connect to monogodb
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('DB Connected'))
    .catch((e) => console.log(e));

//middleware
app.use(express.json());

// ! -----Routes---------
app.use("/", usersRouter);
app.use("/", courseRouter);
app.use("/", courseSectionRouter);

// Start the server
app.listen(PORT, console.log(`Server is runing on the port ${PORT}`));