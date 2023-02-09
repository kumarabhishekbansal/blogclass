const { JsonWebTokenError } = require("jsonwebtoken");
const { User } = require("./models");
const jwt = require("jsonwebtoken");
var validator = require("validator");
const SECRET_KEY = "JAISHREERAMJIJAIMATADI";



// password validation

const checkPass = (password) => {
  var special = false;
  var number = false;
  var lower = false;
  var upper = false;
  var charlen = false;

  var specialc = ["@", "$", "-", "_", "!", "&", "^", "#"];
  var numberc = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  var lowerc = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  var upperc = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  if (password.length >= 8) {
    charlen = true;
    // console.log("charlen ",charlen);
  }

  if (!charlen) return false;

  for (let i = 0; i < specialc.length; i++) {
    if (password.includes(specialc[i])) {
      special = true;
    //   console.log(special);
      break;
    }
  }

  if (!special) return false;

  for (let i = 0; i < numberc.length; i++) {
    if (password.includes(numberc[i])) {
      number = true;
      break;
    }
  }

  if (!number) return false;

  for (let i = 0; i < lowerc.length; i++) {
    if (password.includes(lowerc[i])) {
      lower = true;
      break;
    }
  }

  if (!lower) return false;

  for (let i = 0; i < upperc.length; i++) {
    if (password.includes(upperc[i])) {
      upper = true;
      break;
    }
  }
  if (!upper) return false;

  if (!charlen || !upper || !lower || !special || !number) return false;
  return true;
};



// to check email validation


const checkemail = (email) => {
  var pattern = /^[A-Za-z0-9_.]{3,}@[A-Za-z]{3,}[.]{1}[A-za-z.]{2,6}$/;
  if (pattern.test(email)) return true;
  return false;
};

// user registration

const register = async (req, res) => {
  try {
    const { username, name, password, email } = req.body;
    // console.log(username,name,password,email);
    if (!username || !name || !password || !email) {
      return res.status(422).json({
        message: "enter all fields",
      });
    }


    // if user already found

    const userfound = await User.findOne({ email: email });
    if (userfound) {
      return res.status(422).json({
        message: "user already exists please login now",
      });
    }

    if (!checkPass(password)) {
        return res.status(422).json({
          message:
            "password must have atleast 8 length,includes one special character,includes one lower character,includes one number,includes one upper character",
        });
      }


    if (!checkemail(email) || !validator.isEmail(email)) {
      return res.status(422).json({
        message: "enter valid email id",
      });
    }

    const usercreate = await User.create({ username, name, password, email });
    await usercreate.save();

    if (usercreate) {
      usercreate.ency_password = undefined;
      usercreate.salt = undefined;
      const { username, name, ency_password, email } = usercreate;
      return res.status(200).json({
        username,
        name,
        email,
        ency_password,
        message: "user created successfully",
      });
    } else {
      return res.status(422).json({
        message: "user not created ",
      });
    }
  } catch (error) {
    console.log("error in register perhaps error occur due to unique username register");
  }
};


// common login as we require this function many time like for generate token or reset password or anything else


const commonlogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({
        message: "enter all fields",
      });
    }
    if (!checkemail(email) || !validator.isEmail(email)) {
        return res.status(422).json({
          message: "enter valid email id",
        });
      }
    const userexist = await User.findOne({ email: email });

    if (!userexist) {
      return res.status(422).json({
        message: "Not register , please signup first",
      });
    }
    if (!userexist.authenticate(password)) {
      return res.status(422).json({
        message: "password incorrect",
      });
    }

    var token = jwt.sign({ _id: userexist._id }, SECRET_KEY);
    userexist.ency_password = undefined;
    userexist.salt = undefined;

    req.body.userexist = userexist;
    req.body.token = token;
    next();
  } catch (error) {
    console.log("error in common login");
  }
};


// login to generate token and from this token we can perform crud operation in both blogs and comment

const login = async (req, res) => {
  try {
    return res.status(200).json({
      message: "user loggin success",
      data: req.body.userexist,
      token: req.body.token,
    });
  } catch (error) {
    console.log("error in login");
  }
};


// password reset after login (common login)


const reset = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    
    if (!checkPass(req.body.newpassword)) {
        return res.status(422).json({
          message:
            "password must have atleast 8 length,includes one special character,includes one lower character,includes one number,includes one upper character",
        });
      }
    user.password = req.body.newpassword;
    user.save();
    return res.status(200).json({
      message: "password reset success",
      data: req.body.userexist,
    });
  } catch (error) {
    console.log("Error in reset");
  }
  return res.status(200).json();
};

module.exports = { register, login, reset, commonlogin, SECRET_KEY };
