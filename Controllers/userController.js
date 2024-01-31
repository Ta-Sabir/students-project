const Mydata = require("../models/articleSchema");
const authUser = require("../models/autUserSchema");
var moment = require("moment");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");


const user_welcome_get = (req, res) => {
  res.render("../views/welcome.ejs");
};

const user_index_get = (req, res) => {
  Mydata.find()
    .then((result) => {
      res.render("index", { mytitle: "Home page", arr: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_add_get = (req, res) => {
  res.render("pages/add");
};

const user_view_get = (req, res) => {
  res.render("pages/view");
};

const user_edit_get = (req, res) => {
  res.render("pages/edit");
};

const user_student_get = (req, res) => {
  Mydata.findById(req.params.id).then((result) => {
    res.render("pages/view", { info: result, moment: moment });
  });
};

const user_signup_get = (req, res) => {
  res.render("../views/auth/signup.ejs");
};

const user_login_get = (req, res) => {
  res.render("../views/auth/login.ejs");
};

const user_edit_id = (req, res) => {
  Mydata.findById(req.params.id).then((result) => {
    res.render("pages/edit", { info: result, moment: moment });
  });
};

const user_index_post = (req, res) => {
  const mydata = new Mydata(req.body);
  mydata
    .save()
    .then((result) => {
      res.redirect("/index.html");
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_add_post = (req, res) => {
  const mydata = new Mydata(req.body);
  mydata
    .save()
    .then((result) => {
      console.log(result);
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_login_post = async (req, res) => {
  const loginUser = await authUser.findOne({ email: req.body.email });
  if (loginUser === null) {
    return res.json({ emailError: "البريد الالكتروني غير موجود يرجي انشاء حساب" });
  } else {
    const match = await bcrypt.compare(req.body.password, loginUser.password);
    if (match) {
      var token = jwt.sign({ id: loginUser._id }, process.env.JWT_SECRET_KEY);
      res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
      res.json({ id: loginUser._id })
    } else {
      res.json({ passwordEroor: "كلمة السر خاطئة" })
    }
  }
};

const user_search = (req, res) => {
  const serachText = req.body.serachText.trim();
  Mydata.find({ $or: [{ firstName: serachText }, { lastName: serachText }] })
    .then((result) => {
      res.render("./pages/search", { info: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_delte = (req, res) => {
  Mydata.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_update = (req, res) => {
  Mydata.updateOne({ _id: req.params.id }, req.body)
    .then(() => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  user_welcome_get,
  user_index_get,
  user_add_get,
  user_view_get,
  user_edit_get,
  user_student_get,
  user_signup_get,
  user_login_get,
  user_edit_id,
  user_index_post,
  user_add_post,
  user_login_post,
  user_search,
  user_delte,
  user_update,
};
