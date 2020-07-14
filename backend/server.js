var express = require("express");
//var bodyParser = require("body-parser");
var cors = require("cors");
var mongoose = require("mongoose");

require("dotenv").config();
//Get routes
let listsRouter = require("./routes/listsRoute");
let usersRouter = require("./routes/usersRoute");


//Create express server
var app = express();
var port = process.env.PORT;

//Middleware, will allow to parse JSON data
app.use(cors());
app.use(express.json());

//Connect to the MongoDB database
mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.connection.once("open", () => {
    console.log("Connected to database.");
});

app.use("/lists", listsRouter);
app.use("/users", usersRouter);

//Start server, listen to certain port.
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});