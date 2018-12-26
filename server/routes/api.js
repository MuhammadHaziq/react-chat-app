import express from "express";
import jsonwebtoken from "jsonwebtoken";
import bodyParser from "body-parser";
import cors from "cors";
import firebase from "firebase";

const api = express.Router();
const jwt = jsonwebtoken;
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// <script src="https://www.gstatic.com/firebasejs/5.6.0/firebase.js" />;
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAQmFH7MAD-mPbuG7O9EZGNOsKMbtgBUb8",
  authDomain: "react-chat-app-953be.firebaseapp.com",
  databaseURL: "https://react-chat-app-953be.firebaseio.com",
  projectId: "react-chat-app-953be",
  storageBucket: "react-chat-app-953be.appspot.com",
  messagingSenderId: "690274230486"
};
firebase.initializeApp(config);

api.use(bodyParser.json());
api.use(cors());

api.get("/user", (req, res) => {
  res.json({
    message: "Hello"
  });
});

api.post("/login", urlencodedParser, (req, res) => {
  let error = {};
  let user = {
    username: req.body.username,
    password: req.body.password
  };
  let username = req.body.username;
  let password = req.body.password;
  if (user.username == "" && user.password == "") {
    error = "please enter Cendraitails";
    return res.status(400).json(error);
  } else if (user.username == "") {
    error = "please enter username";
    return res.status(400).json(error);
  } else if (user.password == "") {
    error = "please enter password";
    return res.status(400).json(error);
  } else if (user.username != "" && user.password != "") {
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => {
        const user = {
          username: username,
          password: password
        };
        let token = jwt.sign({ user }, "secratKey", {});
        let data = {
          token,
          user
        };
        res.send(data);
        // res.send({ message: "hello" });
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        return res.status(400).json(errorMessage);
      });
    //
    // let token = jwt.sign({ user }, "secratKey", {});
    // let data = {
    //   token,
    //   user
    // };
    // res.json($status);
    // res.send(data);
  }
});

export default api;
