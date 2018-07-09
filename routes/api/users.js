const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
// const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();

//Load input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateDashboardInput=require('../../validation/dashboard')

//Load User Model
const User = require("../../models/User");

//@route: GET to /api/users/test
//@desc: Testing the GET route
//@access: public
router.get("/test", (req, res) => {
  res.json({ msg: "testing /api/users/test" });
});

//@route: POST to /api/users/register
//@desc: Register a user
//@access: public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = "Email already exists!!";
        res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200",
          r: "pg",
          d: "mm"
        });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar: avatar,
          address: req.body.address,
          address2: req.body.address2,
          city: req.body.city,
          state: req.body.state,
          zipcode: req.body.zipcode,
          phonenumber: req.body.phonenumber
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hashPwd) => {
            if (err) throw err;
            newUser.password = hashPwd;
            newUser
              .save()
              .then(newuser => res.status(200).json(newuser))
              .catch(err => res.status(400).json(err));
          });
        });
      }
    })
    .catch(err => {
      console.log("error .....");
      console.log(err);
    });
});

//@route: POST to /api/users/login
//@desc: Login a user, return JWT(jason-web-token)
//@access: public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        errors.email = "Incorrect email!! User not found";
        res.status(404).json(errors);
      } else {
        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            //user matched
            const payload = {
              id: user._id,
              name: user.name,
              avatar: user.avatar,
              zipcode: user.zipcode
            };
            jwt.sign(
              payload,
              process.env.secretOrKey,
              { expiresIn: 3600 },
              (error, token) => {
                res.json({
                  success: true,
                  token: `Bearer ${token}`
                });
              }
            );
          } else {
            errors.password = "Incorrect Password!!";
            res.status(400).json(errors);
          }
        });
      }
    })
    .catch(err => {
      res.json(err);
    });
});

//@route: GET to /api/users/current
//@desc: Get the current user
//@access: private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
      address: req.user.address,
      address2: req.user.address2,
      city: req.user.city,
      state: req.user.state,
      zipcode: req.user.zipcode,
      admin: req.user.admin
    });
  }
);

//@route: GET to /api/users/all
//@desc: Get all the users
//@access: private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    User.find({})
      .then(users => {
        if (req.user.admin) {
          res.json(users);
        } else {
          res.status(400).json({ access: "Access Denied!!" });
        }
      })
      .catch(err => console.log(err));
  }
);

//@route: POST to /api/users/current
//@desc: update current user Info
//@access: private
router.post(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateDashboardInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    User.findById(req.user.id)
      .then(userfound => {
        const avatar = gravatar.url(req.body.email, {
          s: "200",
          r: "pg",
          d: "mm"
        });
        userfound.name = req.body.name;
        userfound.email = req.body.email;
        userfound.avatar = avatar;
        userfound.address = req.body.address;
        userfound.address2 = req.body.address2;
        userfound.city = req.body.city;
        userfound.state = req.body.state;
        userfound.zipcode = req.body.zipcode;
        userfound.phonenumber = req.body.phonenumber;
        // userfound.password=req.body.password
        // bcrypt.genSalt(10, (err, salt) => {
        //   bcrypt.hash(userfound.password, salt, (err, hashPwd) => {
        //     if (err) throw err;
        //     userfound.password = hashPwd;
        userfound.save().then(newuser => res.status(200).json(newuser));

      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
