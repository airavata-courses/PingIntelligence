const express = require('express')
const app = express()
const PORT = 3001
const routes = require('./routes/user')
const myconfig = require('./config')
const bp = require("body-parser");
const router = express.Router();
const cors = require("cors");
const axios = require("axios");
const fileUpload = require("express-fileupload");
const multer  = require("multer");
const upload  = multer();
const FormData = require('form-data');
const fs = require("fs");
const qs = require("querystring");
var request = require("request");



app.use(fileUpload())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const formidable = require('formidable')
/**
 * login by user
 */

app.post('/login',(req,res) => {
    console.log(req.body)
    axios.post('http://localhost:8080/user/login',{
        username: req.body.username,
        password: req.body.password
      }).then(
          function(response) {
            console.log(response.data)
            res.send(response.data);
          }).catch(
            function(error){
                console.log(error)
    })
})

/**
 * register by user
 */
app.post('/register',(req,res) => {
    console.log(req.body)
    axios.post('http://localhost:8080/user/signup',{
        username: req.body.username,
        password: req.body.password,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        emailID:req.body.emailID,
      }).then(
          function(response) {
            console.log(response.data)
            res.send(response.data);
          }).catch(
            function(error){
                console.log(error)
    })
})

/**
 * Session user information
 */

app.post('/verifyusertoken',(req,res) => {
  // console.log(req.body)
  axios.post('http://localhost:8080/user/verify',qs.stringify({
    secret: "Bearer " + req.body.secret
  }), {
  headers: { 
    "Content-Type": "application/x-www-form-urlencoded"
  }}).then(
        function(response) {
          console.log(response.data)
          res.send(response.data);
        }).catch(
          function(error){
              console.log(error)
  })
})

/**
 * create album by owner
 */
app.post('/createalbum',(req,res) => {
  console.log(req.body)
  axios.post('http://localhost:8090/album/create',{
      name: req.body.name,
      description: req.body.description,
      firstname:req.body.firstname,
      sharedpriveledges:req.body.sharedpriveledges,
      owner:req.body.owner,
    }).then(
        function(response) {
          console.log(response.data)
          res.send(response.data);
        }).catch(
          function(error){
              console.log(error)
  })
})

/**
 * find albums per user
 */
app.post('/useralbums',(req,res) => {
  // console.log(req.body)
  axios.get('http://localhost:8090/album/allalbums?username=' + req.body.username).then(
        function(response) {
          console.log(response.data)
          res.send(response.data);
        }).catch(
          function(error){
              console.log(error)
  })
})


/**
 *  upload photos
 */

app.post('/uploadalbumphotos',(req,res) => {
  const formData = new FormData();
  const data = req.files.files.data.toString('base64'); 
  fs.writeFileSync('./testfile.jpg',data,(err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
  console.log(req.body.sharedusers)

  var options = { method: 'POST',
  url: 'http://localhost:8090/album/upload',
  headers: 
   { 
     'cache-control': 'no-cache',
     'content-type': 'multipart/form-data' },
  formData: { albumname: req.body.albumname,
  sharedusers: req.body.sharedusers,
  photoname: req.body.photoname,
  files: fs.createReadStream('testfile.jpg')}

 }

 request(options, function (error, response, body) {
  if (error) throw new Error(error);

  res.send(body)
})
})

/**
 * Share album with users
 */

app.post('/sharealbum',(req,res) => {
  var options = { method: 'POST',
  url: 'http://localhost:8090/album/share',
  headers: 
   { 
     'cache-control': 'no-cache',
     'content-type': 'application/json' },
  body: 
   { albumname: req.body.albumname,
     usernames: req.body.usernames },
  json: true };

  request(options, function (error, response, body) {
  if (error) throw new Error(error);
  });
  res.send(body)
})

/**
 * Find one album photos
 */

app.post('/findonealbum',(req,res) => {
  var options = { method: 'GET',
  url: 'http://localhost:8090/album/locatealbum',
  headers: 
   { 
     'cache-control': 'no-cache',
     'content-type': 'application/json' },
  qs: 
   { albumname: req.query.albumname},
  json: true };
  var body1 = "";
  request(options, function(error, response, body,callback) {
      if (error) throw new Error(error);
      res.send(body)
        })

})


/**
 * Search photo by metadata
 */

app.post('/searchphotometadata',(req,res) => {
  var options = { method: 'GET',
  url: 'http://127.0.0.1:8000/search/images/',
  headers: 
   { 
     'cache-control': 'no-cache',
     'content-type': 'application/json' },
  qs: 
   { height: req.query.height,
    width: req.query.width,
    mode: req.query.mode,
    formats: req.query.format,
    image:req.query.image,
    annotationtags: req.query.annotationtags,
    created_on:req.query.created_on,
    description:req.query.description,
    photoname:req.query.photoname,
  },
  json: true };
  request(options, function(error, response, body,callback) {
      if (error) throw new Error(error);
      res.send(body)
        })

})



app.use(express.json())
app.listen(PORT, () => {
    console.log("port started on :" + PORT)
})