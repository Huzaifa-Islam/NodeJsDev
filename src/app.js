const express = require("express");
const app = express();

const {adminAuth} = require("./middlewares/auth")
//Auth middleware for all requests GET, POST, etc for apis starting with /admin
app.use("/admin", adminAuth)

app.get("/admin/getAllData",  (req, res, next) => {
    res.send("added a user")
});

app.get("/admin/deleteUser", (req, res) => {
    res.send("Deleted a user");
  
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
