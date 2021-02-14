var mongo = require('mongodb')
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/pingintelligence";

// Inserting into 'user' document
MongoClient.connect(url,
    function(err, db) {
    if (err) throw err;
    console.log("Database connected!");
    var dbo = db.db("pingintelligence");
    dbo.collection("user").insertOne({"first_name":"Sudip", "last_name":"Padhye", "email":"sudip.padhye@gmail.com", "Password":"abcd1234"}, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});



// Inserting into 'image_upload' document
MongoClient.connect(url,
    function(err, db) {
    if (err) throw err;
    console.log("Database connected!");
    var dbo = db.db("pingintelligence");
    dbo.collection("image_upload").insertOne({"email":"sudip.padhye@gmail.com", "Image_id":"1000021543.jpg", "Image_upload_path": "gdrive/abcd/"}, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});



// Inserting into 'image_tags' document
MongoClient.connect(url,
    function(err, db) {
    if (err) throw err;
    console.log("Database connected!");
    var dbo = db.db("pingintelligence");
    dbo.collection("image_tags").insertOne({"Image_id":"1000021543.jpg", "tag": "animals"}, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});




// Inserting into 'image_metadata' document
MongoClient.connect(url,
    function(err, db) {
    if (err) throw err;
    console.log("Database connected!");
    var dbo = db.db("pingintelligence");
    dbo.collection("image_metadata").insertOne({"Image_id":"1000021543.jpg", "metadata_type":"Image Resolution", "metadata_value":"1024*1600"}, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});




// Inserting into 'image_sharing' document
MongoClient.connect(url,
    function(err, db) {
    if (err) throw err;
    console.log("Database connected!");
    var dbo = db.db("pingintelligence");
    dbo.collection("image_sharing").insertOne({"sharer_email":"sudip.padhye@gmail.com", "sharee_email":"test@gmail.com", "Image_id":"1000021543.jpg"}, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});