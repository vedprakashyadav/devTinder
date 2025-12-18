const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Dashboard!!");
});

app.get("/test", (req, res) => {
  res.send("Hello From the Server!!!!!!!!!!!!!!!!!");
});

app.listen(7777, () => {
    console.log("Server is running on port 7777");
});