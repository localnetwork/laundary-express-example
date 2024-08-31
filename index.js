const express = require("express");
const app = express();

const userRoutes = require("./routes/userRoutes");

app.use(express.json()); // to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // to parse URL-encoded bodies

app.use(userRoutes);

app.listen(1000, () => {
  console.log("http://localhost:1000");
});
