const express = require("express");
//const bodyParser = require("body-parser");
//const path = require("path");
//const helmet = require("helmet");
//const cors = require("cors");
//const rateLimit = require("express-rate-limit"); //===> Use to limit repeated requests
/*const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //===> 15 minutes
  max: 100, //===> limit each IP to 100 requests per windowMs
});*/

//const saucesRoutes = require("./routes/sauce");
//const userRoutes = require("./routes/user");

/*mongoose
  .connect(process.env.MDB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
*/
const app = express();

//app.use(limiter);

//app.use(helmet.xssFilter()); //====>Cross-site scripting sercurity

//app.use(cors({ origin: "http://localhost:4200" })); //====> Secure CORS

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

app.use("/api/test", (req, res, next) => {
  const stuff = [
    {
      _id: "randomId",
      title: "Le Grand Test",
      description: "Ce test a pour but de tester",
      price: 4900,
      userId: "WadeSpectre",
    },
  ];
  res.status(200).json(stuff);
});
//app.use(bodyParser.json());

//app.use("/images", express.static(path.join(__dirname, "images")));

//app.use("/api/sauces", saucesRoutes);

//app.use("/api/auth", userRoutes);

module.exports = app;
