const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const createError = require("http-errors");

const userRouter = require("./routes/UserRoute");
const bookRouter = require("./routes/BookRoute");

const app = express();

dotenv.config();

const port = process.env.PORT;

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Connected to MongoDB...");
}).catch((err) => {
    console.log(err);
});

app.use(bodyParser.json({limit: "50mb"}));
app.use(cors());
app.use(morgan("common"));

app.use("/user", userRouter);
app.use("/book", bookRouter);

app.use((req, res, next) => {
    next(createError(404));
});
app.use((err, req, res) => {
    console.log(err.stack);
    res.status(err.status || 500).send(err.message);
})

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port} ...`);
});