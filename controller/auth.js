const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Helper = require("../helper/helper");
const Model = require("../models");
const User = Model.user;

const saltRound = 10;
const secretKey = "siunix";

exports.signUp = (req, res) => {
  let isSuccess = false;
  let message = "";

  const { fullname, email, password } = req.body;
  const id = Helper.generateId();

  User.findAll({
    where: {
      email
    }
  })
    .then(data => {
      if (data.length > 0) {
        let finalRes = {
          isSuccess,
          message: "Email has been registered",
          data: []
        };
        res.status(200).json(finalRes);
      } else {
        bcrypt.genSalt(saltRound, (err, salt) => {
          if (err) {
            let finalRes = {
              isSuccess,
              message: "Bad request",
              data: []
            };
            res.status(400).json(finalRes);
          } else {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) {
                let finalRes = {
                  isSuccess,
                  message: "Bad request",
                  data: []
                };
                res.status(400).json(finalRes);
              } else {
                User.create({
                  id,
                  fullname,
                  email,
                  password: hash
                })
                  .then(user => {
                    const token = jwt.sign({ id: user.id }, secretKey);
                    let finalRes = {
                      isSuccess: true,
                      message: "success",
                      data: { token }
                    };

                    res.status(200).json(finalRes);
                  })
                  .catch(error => {
                    let finalRes = {
                      isSuccess,
                      message: "Bad request",
                      data: []
                    };
                    res.status(400).json(finalRes);
                  });
              }
            });
          }
        });
      }
    })
    .catch(error => {
      let finalRes = {
        isSuccess,
        message: "Server response error",
        data: []
      };
      res.status(500).json(finalRes);
    });
};

exports.sign = (req, res) => {
  let isSuccess = false;
  let message = "";

  const { email, password } = req.body;

  User.findOne({
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    },
    where: {
      email: email
    }
  })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            let finalRes = {
              isSuccess,
              message: "Bad request",
              data: []
            };
            res.status(400).json(finalRes);
          } else if (!isMatch) {
            let finalRes = {
              isSuccess,
              message: "Password doesn't match!",
              data: []
            };
            res.status(200).json(finalRes);
          } else {
            const token = jwt.sign({ id: user.id }, secretKey);
            let finalRes = {
              isSuccess: true,
              message: "success",
              data: { token }
            };

            res.status(200).json(finalRes);
          }
        });
      } else {
        let finalRes = {
          isSuccess,
          message: "Wrong email!",
          data: []
        };
        res.status(200).json(finalRes);
      }
    })
    .catch(error => {
      let finalRes = {
        isSuccess,
        message: "Server response error",
        data: []
      };
      res.status(500).json(finalRes);
    });
};
