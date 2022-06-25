const express = require("express");
var router = express.Router();

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://phuc_2000:131220Pc@ac-av7zk29-shard-00-00.ywansie.mongodb.net:27017,ac-av7zk29-shard-00-01.ywansie.mongodb.net:27017,ac-av7zk29-shard-00-02.ywansie.mongodb.net:27017/test?replicaSet=atlas-enp7zg-shard-0&ssl=true&authSource=admin";
router.get("/", (req, res) => {
  res.render("login");
});
router.post("/", async (req, res) => {
  let un = req.body.un;
  let pass = req.body.pass;
  if (un == "admin" && pass == "admin") {
    let client = await MongoClient.connect(url);
    let dbo = client.db("storeman");

    let results = await dbo.collection("product").find({}).toArray();
    var fullUrl = req.protocol + "://" + req.get("host") + "/product";
    res.redirect(fullUrl);
  } else {
    res.end("Login failed!");
  }
});
module.exports = router;
