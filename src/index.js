import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import session from "express-session";
import passport from "passport";
import localStrategy from "passport-local";

import * as characters from "./api/characters.js";
import uploadImage from "./api/image-upload.js";

const app = express();
const port = 3000;
const Strategy = localStrategy.Strategy;

passport.use(
  new Strategy(function(username, password /*, done*/) {
    console.log(username, password);
    // User.findOne({ username: username }, function (err, user) {
    //   if (err) { return done(err); }
    //   if (!user) { return done(null, false); }
    //   if (!user.verifyPassword(password)) { return done(null, false); }
    //   return done(null, user);
    // });
  })
);

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
    res.redirect("/");
  }
);

app.get("/characters", characters.readAllCharacters);
app.post("/character", characters.createCharacter);
app.get("/character/:charId", characters.readSingleCharacter);
app.post("/character/:charId", characters.updateCharacter);
app.delete("/character/:charId", characters.deleteCharacter);
app.post("/image-upload", uploadImage);

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
