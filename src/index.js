import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import session from "express-session";
import sessionFileStore from "session-file-store";
import passport from "passport";
import localStrategy from "passport-local";
import fs from 'fs';

import * as characters from "./api/characters.js";
import * as campaigns from "./api/campaigns.js";
import uploadImage from "./api/image-upload.js";
import * as users from "./api/users.js";

const app = express();
const port = JSON.parse(fs.readFileSync('./config.json')).port || 3000;
const Strategy = localStrategy.Strategy;
const FileStore = sessionFileStore(session);

passport.use(
  new Strategy(function(username, password, cb) {
    users
      .findByUsername(username)
      .then(user => {
        if (!user) {
          return cb(false);
        }
        if (user.password != password) {
          return cb(false);
        }
        return cb(user);
      })
      .catch(err => cb(err));
  })
);
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});
passport.deserializeUser(function(id, cb) {
  users
    .findById(id)
    .then(user => cb(null, user))
    .catch(err => cb(err));
});

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "keyboard cat",
    store: new FileStore(),
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  fileUpload({
    createParentPath: true
  })
);

app.post("/login", function(req, res, next) {
  passport.authenticate("local", function(user) {
    if (!user) {
      return res
        .status(401)
        .json({ status: "error", details: "wrong credentials" });
    }

    req.login(user, () => {
      return res.send({ status: "success", details: "logged in", user });
    });
  })(req, res, next);
});
app.get("/logout", function(req, res) {
  req.logout();
  res.json({ status: "success", details: "logged out" });
});

app.get("/characters", characters.readAllCharacters);
app.post("/character", characters.createCharacter);
app.get("/character/:charId", characters.readSingleCharacter);
app.post("/character/:charId", characters.updateCharacter);
app.delete("/character/:charId", characters.deleteCharacter);
app.get("/campaigns", campaigns.readAllCampaigns);
app.post("/campaign", campaigns.createCampaign);
app.get("/campaign/:campaignId", campaigns.readSingleCampaign);
app.post("/campaign/:campaignId", campaigns.updateCampaign);
app.delete("/campaign/:campaignId", campaigns.deleteCampaign);
app.post("/image-upload", uploadImage);

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
