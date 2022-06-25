const express = require("express");
var router = express.Router();

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://phuc_2000:131220Pc@ac-av7zk29-shard-00-00.ywansie.mongodb.net:27017,ac-av7zk29-shard-00-01.ywansie.mongodb.net:27017,ac-av7zk29-shard-00-02.ywansie.mongodb.net:27017/test?replicaSet=atlas-enp7zg-shard-0&ssl=true&authSource=admin";
router.get("/", async (req, res) => {
  let client = await MongoClient.connect(url);
  let dbo = client.db("storeman");

  let results = await dbo.collection("product").find({}).toArray();
  res.render("allProduct", { product: results });
});

router.get("/insert", (req, res) => {
  res.render("insertProduct");
});

router.get("/delete", async (req, res) => {

  let id = req.query.id;
  var ObjectID = require("mongodb").ObjectID;
  let condition = { _id: ObjectID(id) };
  let client = await MongoClient.connect(url);
  let dbo = client.db("storeman");
  await dbo.collection("product").deleteOne(condition);
  //
  let results = await dbo.collection("product").find({}).toArray();
  res.render("allProduct", { product: results });
});

router.post("/doInsert", async (req, res) => {
  let client = await MongoClient.connect(url);
  let dbo = client.db("storeman");
  let name = req.body.name;
  let price = req.body.price;


  let id = req.body.id;

  let img = req.body.img;
  let note = req.body.note;
  let onSale = req.body.onSale;
  let notSale = req.body.notSale;

  // let addnew = req.body.addnew;

  let newProduct = {
    ProductId: id,
    ProductName: name,
    Image: img,
    Price: price,
    Note: note,
    onSale: onSale,
    notSale: notSale,
    // Addnew: addnew,
  };
  await dbo.collection("product").insertOne(newProduct);

  let results = await dbo.collection("product").find({}).toArray();
  res.render("allProduct", { product: results });
});

module.exports = router;
