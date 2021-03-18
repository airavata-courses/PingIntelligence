const express = require("express");
const app = express();
const PORT = 3001;
const routes = require("./routes/user");
const myconfig = require("./config");
const bp = require("body-parser");
const router = express.Router();
const cors = require("cors");
const axios = require("axios");
const fileUpload = require("express-fileupload");
const multer = require("multer");
const upload = multer();
const FormData = require("form-data");
const fs = require("fs");
const qs = require("querystring");
var request = require("request");
const Blob = require("cross-blob");

app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const formidable = require("formidable");
/**
 * login by user
 */

app.post("/login", (req, res) => {
  console.log(req.body);
  axios
    .post("http://user-mgmt:8091/user/login", {
      username: req.body.username,
      password: req.body.password,
    })
    .then(function (response) {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

/**
 * register by user
 */
app.post("/register", (req, res) => {
  console.log(req.body);
  axios
    .post("http://user-mgmt:8091/user/signup", {
      username: req.body.username,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      emailID: req.body.emailID,
    })
    .then(function (response) {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

/**
 * Session user information
 */

app.post("/verifyusertoken", (req, res) => {
  // console.log(req.body)
  axios
    .post(
      "http://user-mgmt:8091/user/verify",
      qs.stringify({
        secret: "Bearer " + req.body.secret,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then(function (response) {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

/**
 * create album by owner
 */
app.post("/createalbum", (req, res) => {
  console.log(req.body);
  axios
    .post("http://upload-mgmt:8092/album/create", {
      name: req.body.name,
      description: req.body.description,
      firstname: req.body.firstname,
      sharedpriveledges: req.body.sharedpriveledges,
      owner: req.body.owner,
    })
    .then(function (response) {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

/**
 * find albums per user
 */
app.post("/useralbums", (req, res) => {
  // console.log(req.body)
  axios
    .get("http://upload-mgmt:8092/album/allalbums?username=" + req.body.username)
    .then(function (response) {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

/**
 *  upload photos
 */

app.post("/uploadalbumphotos", (req, res) => {

  const formData = new FormData();
  const data = req.files.files;
  console.log(data)
  const photo =  req.body.photoname.split(",")

  for (i = 0; i < data.length; i++) {

    fs.writeFileSync(
      "./assets/" + photo[i] + ".jpg",
      data[i].data.toString("base64"),
      function (err) {}
    );
    
  var options = {
    method: "POST",
    url: "http://upload-mgmt:8092/album/upload",
    headers: {
      "cache-control": "no-cache",
      "content-type": "multipart/form-data",
    },
    formData: {
      albumname: req.body.albumname,
      sharedusers: req.body.sharedusers,
      photoname: photo[i],
      files: fs.readFileSync(
        "./assets/" + photo[i] + ".jpg",
        function (err, data) {
          if (!err) {
          } else {
            // console.log(err);
          }
        }
      ),
    },
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  });
}

  res.send("200");
});

/**
 * Share album with users
 */

app.post("/sharealbum", (req, res) => {
  var options = {
    method: "POST",
    url: "http://upload-mgmt:8092/album/share",
    headers: {
      "cache-control": "no-cache",
      "content-type": "application/json",
    },
    body: { albumname: req.body.albumname, usernames: req.body.usernames },
    json: true,
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  });
  res.send("ok");
});

/**
 * Find one album photos
 */

app.post("/findonealbum", (req, res) => {
  var options = {
    method: "GET",
    url:
      "http://upload-mgmt:8092/album/locatealbum?albumname=" + req.body.albumname,
  };
  console.log(options);
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send(body);
  });
});

/**
 * Search photo by metadata
 */

app.post("/searchphotometadata", (req, res) => {
  var options = {
    method: "GET",
    url: "http://metadata-search:8000/search/images/",
    headers: {
      "cache-control": "no-cache",
      "content-type": "application/json",
    },
    qs: {
      height: req.body.height,
      width: req.body.width,
      mode: req.body.mode,
      formats: req.body.format,
      image: req.body.image,
      annotationtags: req.body.annotationtags,
      created_on: req.body.created_on,
      description: req.body.description,
      title: req.query.photoname,
    },
    json: true,
  };
  request(options, function (error, response, body, callback) {
    // if (error) throw new Error(error);
    res.send(body);
  });
});

/**
 * open one photos
 */

// app.post("/viewphoto", (req, res) => {
//   console.log("hello")
//   var options = {
//     method: "GET",
//     url: "http://127.0.0.1:8000/google/upload/images/?title" + req.body.photoname
//   };
//   request(options, function (error, response, body) {
//       console.log(body)
//       res.send(new Buffer.from(body,"base64"))
//   });

//   });

app.post("/downloadimage", (req, res) => {
  console.log("hello");
  console.log("idsssssssssssssss" + req.body.ids);
  var options = {
    method: "GET",
    url: "http://upload-mgmt:8092/photo/download?ids=" + req.body.ids,
  };
  console.log(options);
  request(options, function (error, response, body) {
    console.log(body);
    res.send(JSON.stringify(body));
    // res.send(new Buffer.from(body,"base64"))
  });
});


app.post("/deletealbum", (req, res) => {
  console.log(req.body);
  axios
    .post("http://upload-mgmt:8092/album/delete", {
      albumname: req.body.albumname
    })
    .then(function (response) {
      // console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      // console.log(error);
    });
});

app.post("/deletephoto", (req, res) => {
  console.log(req.body);
  axios
    .post("http://upload-mgmt:8092/photo/delete", {
      photo_id: req.body.ids,
      albumname: req.body.albumname
    })
    .then(function (response) {
      // console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      // console.log(error);
    });
});



app.use(express.json());
app.listen(PORT, () => {
  console.log("port started on :" + PORT);
});
