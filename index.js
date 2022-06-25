const express = require("express");
var router = express.Router();

var MongoClient = require("mongodb").MongoClient;
var url ="mongodb://phuc_2000:131220Pc@ac-av7zk29-shard-00-00.ywansie.mongodb.net:27017,ac-av7zk29-shard-00-01.ywansie.mongodb.net:27017,ac-av7zk29-shard-00-02.ywansie.mongodb.net:27017/test?replicaSet=atlas-enp7zg-shard-0&ssl=true&authSource=admin";

router.get("/", async (req, res) => {
  let client = await MongoClient.connect(url);
  let dbo = client.db("storeman");

  
  let results = await dbo.collection("product").find({}).toArray();
  res.render("index", { product: results });
});

module.exports = router;
