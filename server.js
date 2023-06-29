const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const { error } = require("console");

const authRoute = require("./routes/authRoute")

require("dotenv").config();


const PORT = process.env.PORT || process.env.API_PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);

const server = http.createServer(app);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
  }).catch((error) => {
    console.log(`Database connection failed. Server not started`);
    console.log(error);
  })

