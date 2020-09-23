const bcrypt = require("bcrypt");
var express = require("express");
var router = express.Router();

var getUsers = require("../public/javascripts/found").getUser;
router.get("/", function (req, res, next) {
  // ((result) => {
  //   res.send(result)
  // })
  res.send("hi");
});
router.get("/me", (req, res) => {
  const sess = req.sess;
  if (!sess || sess.isAdmin === false) {
    res.status(403);
  }
  if (sess.email) {
    userData = getUser(sess.email);
    res.send(userData);
  }
});
router.post("/", function (req, res) {
  const sess = req.session;
  // sess.email = req.body.email
  // sess.isAdmin = true

  // const user = sess.email
  // if sess.user.admin === true

  // sess.destroy()
  getUsers((users) => {
    let result = users.find((pro) => pro.userName == req.body.userName);
    if (result) {
      if (bcrypt.compareSync(req.body.password, result.password)) {
        const sess = req.session;
        sess.username = req.userName;
        sess.address = result.address;
        sess.isAdmin = result.isAdmin;
        sess.email = result.email;
        res.status(200).send({
          message: "ok ",
          isAdmin: result.isAdmin,
          address: result.address,
          email: result.email,
        });
      } else {
        res.status(200).send({
          message: "incorect password",
        });
      }
    } else {
      res.status(200).send({
        message: "user not found",
      });
    }
  });
});
router.post("/admin", (req, res) => {
  const sess = req.session;
  if (!sess || !sess.isAdmin) {
    //  Pas les droits
  }
  // OKAdmin
});
router.post("/logout", (req, res) => {
  const sess = req.session;
  sess.destroy();
  res.status(200).send();
});
router.post("/suscription", (req, res) => {
  const username = req.body.userName
  const email = req.body.email;
  const password = req.body.password;

  const address = req.body.address;

  // vérfier si l'email est valide
  // check if exist email
  // si l'user exist alors erreur (on ne peux pas s'inscire avec un mail qui existe déjà)
  //sinon  insert db
  const users = global.dbo.collection("users");
  users.findOne(
    {
      email: email,
    },
    function (err, result) {
      if (err) throw err;

      console.log(result);

      if (!result) {
        bcrypt.hash(password, 10, (err, encrypted) => {
          console.log(err, encrypted);
          users.insert({
              userName: username,
              address,
            email,
            password: encrypted,
          });
          const sess = req.session;
          sess.email = email;
          sess.address = address;
          sess.userName = username
          sess.isAdmin = false;
          res.status(200).send({
            status: "ok",
            email: email,
            address: address,
            isAdmin: false,
          });
        });
      } else {
        res.status(200).send("user existant merci de vous connecter");
      }
    }
  );
});

module.exports = router;
