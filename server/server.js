// const express = require("express");
// const body = require("body-parser");
// const cors = require("cors");
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import api from "./routes/api.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("", api);
//
// app.get("/user", (req, res) => {
//   res.json({
//     message: "Hello"
//   });
// });
//
// app.post("/login", (req, res) => {
//   const user = {
//     username: req.body.username,
//     password: req.body.password
//   };
//   jwt.sign({ user }, "secratKey", (err, token) => {
//     res.json({
//       token
//     });
//   });
// });

app.listen(5001);
