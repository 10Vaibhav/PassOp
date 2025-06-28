const express = require("express");
const app = express();
const port = 3000;
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

const {MongoClient, ObjectId} = require("mongodb");

const url = process.env.Mongo_URL;
const client = new MongoClient(url);

const dbName = 'passop';

client.connect();

app.get("/",async (req, res)=> {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
});

app.post("/", async (req, res)=> {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    
    const findResult = await collection.insertOne(password);
    res.send({success: true, result : findResult});
});

app.put("/", async (req, res)=> {
    const { id, ...updateData } = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    
    const findResult = await collection.updateOne(
        { id: id },
        { $set: updateData }
    );
    res.send({success: true, result : findResult});
});

app.delete("/", async (req, res)=> {
    const { id } = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne({ id: id });
    res.send({success: true, result : findResult});
});

app.listen(port, ()=> {
    console.log(`server listening on port ${3000}`);
});

