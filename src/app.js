require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const { middleware } = require("./middleware/middleware");

const { env } = require("../config");
const router = require("./routes");

const PORT = env.PORT || 4000;

const app = express();

app.use(cors());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(middleware);
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
