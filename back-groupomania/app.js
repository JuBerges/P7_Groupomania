const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
//const helmet = require("helmet");
const cors = require("cors");
//const rateLimit = require("express-rate-limit"); //===> Use to limit repeated requests
/*const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //===> 15 minutes
  max: 100, //===> limit each IP to 100 requests per windowMs
});*/

const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");

const app = express();

//app.use(limiter);

//app.use(helmet.xssFilter()); //====>Cross-site scripting sercurity

app.use(cors()); //====> Secure CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

module.exports = app;
