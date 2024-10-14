const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const {
      name,
      password,
      email,
      gender,
      phone,
      age,
      lookfor,
      bio
    } = req.body
    const user = await new User({
      name,
      email,
      gender,
      phone,
      age,
      lookfor,
      bio,
      password: bcrypt.hashSync(password, 8),
    });

    user.save()

    return res.send({ message: "User was registered successfully!" });

  } catch (error) {
    res.status(500).send({ message: err });
    console.log("server error", error)
  }

};

exports.signin = async (req, res) => {
  try {
    console.log(req.body)
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "User Not found." });
    } else {
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }
      const token = jwt.sign({ id: user.id },
        config.secret,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        });


      req.session.token = token;

      res.status(200).send({
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      });
    }
  } catch (error) {
    res.status(500).send({ message: error });
    console.log("Server error", error)
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};
