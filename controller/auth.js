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

  const { fullname, email, password, roleId } = req.body;
  const id = Helper.generateId();

  let role = roleId.toLowerCase().trim();

  if (role !== "student" && role !== "teacher") {
    let finalRes = {
      isSuccess,
      message: "Role type is not registered!",
      data: []
    };
    return res.status(200).json(finalRes);
  }

  User.findAll({
    where: {
      email,
      roleId: role
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
                  roleId,
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

  const { email, password, roleId } = req.body;

  let role = roleId.toLowerCase().trim();

  if (role !== "student" && role !== "teacher") {
    let finalRes = {
      isSuccess,
      message: "Role type is not registered!",
      data: []
    };
    return res.status(200).json(finalRes);
  }

  if (role === "teacher") {
    User.findOne({
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      },
      where: {
        email: email,
        roleId: role
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
            message: "You are not not registered as teacher!",
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
  }

  if (role === "student") {
    User.findOne({
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      },
      where: {
        email: email,
        roleId: role
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
            message: "You are not not registered as student!",
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
  }
};
