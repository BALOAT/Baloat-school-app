require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const usersRouter = require("./routes/usersRouter");
const courseRouter = require("./routes/courseRouter");
const courseSectionRouter = require("./routes/courseSectionRouter");
const progressRouter = require("./routes/progresRouter");
const app = express();
const PORT = process.env.PORT || 5000


// connect to monogodb
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('DB Connected'))
    .catch((e) => console.log(e));

//middleware
app.use(express.json());
// Cors
const corsOptions = {
    origin: ["http://localhost:5173"],
    // credentials: true
};
app.use(cors(corsOptions));

const apiVersion = "v1"

// ! -----Routes---------
app.use("/", usersRouter);
app.use(`/api/${apiVersion}/courses`, courseRouter);
app.use(`/api/${apiVersion}/course-sections`, courseSectionRouter);
app.use("/", progressRouter);

// Start the server
app.listen(PORT, console.log(`Server is runing on the port ${PORT}`));