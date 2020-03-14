import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import session from "express-session";
import passport from "passport";
import localStrategy from "passport-local";

import * as characters from "./api/characters.js";
import uploadImage from "./api/image-upload.js";
import * as users from "./api/users.js";

const app = express();
const port = 3000;
const Strategy = localStrategy.Strategy;

passport.use(
  new Strategy(function(username, password, cb) {
    users
      .findByUsername(username)
      .then(user => {
        if (!user) {
          return cb(null, false);
        }
        if (user.password != password) {
          return cb(null, false);
        }
        return cb(null, user);
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
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  fileUpload({
    createParentPath: true
  })
);

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  function(req, res) {
    res.json({'status': 'logged in'});
  }
);
app.get('/logout',
  function(req, res){
    req.logout();
      res.json({'status': 'logged out'});
  });

app.get("/characters", characters.readAllCharacters);
app.post("/character", characters.createCharacter);
app.get("/character/:charId", characters.readSingleCharacter);
app.post("/character/:charId", characters.updateCharacter);
app.delete("/character/:charId", characters.deleteCharacter);
app.get("/campaigns", characters.readAllCampaigns);
app.post("/campaign", characters.createCampaign);
app.get("/campaign/:campaignId", characters.readSingleCampaign);
app.post("/campaign/:campaignId", characters.updateCampaign);
app.delete("/campaign/:campaignId", characters.deleteCampaign);
app.post("/image-upload", uploadImage);

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
