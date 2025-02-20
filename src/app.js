const express = require("express");

const app = express();

app.get("/admin/getAllData", (req, res, next) => {
  //check if the request is authorised
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (isAdminAuthorized) {
    res.send("All Data sent");
  } else {
    res.status(401).send("unauthorized request");
  }
});

app.get("/admin/deleteUser", (req, res) => {
  //check if the request is authorised
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (isAdminAuthorized) {
    res.send("Deleted a user");
  } else {
    res.status(401).send("unauthorized request");
  }
  
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
