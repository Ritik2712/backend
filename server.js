const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true, //make this true
  autoIndex: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connected successfully");
});

const codeRouter = require("./Routes/Code");
const userRouter = require("./Routes/User");

app.use("/code", codeRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
