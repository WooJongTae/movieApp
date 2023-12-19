const express = require("express");
const UserDatas = require("./models/UserDatas");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const config = require("./config/key");
const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = 5000;

const mongoose = require("mongoose");
const { auth } = require("./middleware/auth");
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("몽고DB 접속"))
  .catch((err) => console.log("에러", err));

app.get("/api/hello", (req, res) => {
  res.send("ㅎㅇㅎㅇ");
});

app.post("/api/users/register", (req, res) => {
  const userData = new UserDatas(req.body);
  userData
    .save()
    .then(() => {
      return res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.log("실패", err);
      return res.json({ success: false, err });
    });
});

app.post("/api/users/login", (req, res) => {
  UserDatas.findOne({ email: req.body.email }).then((userData) => {
    if (!userData) {
      return res.status(400).json({
        success: false,
        message: "이메일이 없습니다. 회원가입 하세요",
      });
    }
    userData.comparePassword(req.body.password).then((isMatch) => {
      if (!isMatch) {
        return res.json({ success: false, message: "비밀번호가 다릅니다.!" });
      }
    });
    userData
      .generateToken()
      .then((userInfo) => {
        console.log(userInfo);
        res
          .cookie("myCookie", userInfo.token)
          .status(200)
          .json({ success: true, userId: userInfo._id });
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  // console.log("응답", res);
  res.status(200).json({
    _id: req.user._id,
    isAdimin: req.user.role == 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.lastname,
    role: req.user.role,
    img: req.user.image,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  UserDatas.findByIdAndUpdate({ _id: req.user._id }, { token: "" })
    .then(() => {
      return res.json({ success: true });
    })
    .catch((err) => {
      return res.json({ success: false, err: err });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
