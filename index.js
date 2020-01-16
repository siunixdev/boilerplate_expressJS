require("express-group-routes");

const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Port declaration
const port = 5000;

// Middleware
const middleware = require("./middleware");

// Controller
const categoryController = require("./controller/category");
const authController = require("./controller/auth");

app.get("/", (req, res) => {
  res.send("Hello express!");
});

app.group("/api/v1", router => {
  // AUTH
  router.post("/signup", authController.signUp);
  router.post("/sign", authController.sign);

  // CATEGORIES
  router.get("/categories", categoryController.list);
  router.get("/category/:id", categoryController.detail);
  router.post("/category", middleware.auth, categoryController.save);
  router.put("/category/:id", middleware.auth, categoryController.update);
  router.delete("/category/:id", middleware.auth, categoryController.delete);
});

app.listen(port, () => console.log(`Listing on port ${port}!`));
