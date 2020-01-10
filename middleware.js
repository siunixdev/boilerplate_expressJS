const Model = require("./models");
const User = Model.user;
const jwt = require("jsonwebtoken");
const secretKey = "siunix";

exports.auth = (req, res, next) => {
  let isSuccess = false;
  let message = "";

  const authHeader = req.headers["authorization"];

  // ambil token dengan lakukan split bearer dan token, lalu kita ambil tokennya di index ke 1,
  // lalu kita perlu pengkodisian, jika headernya tidak ada maka akan mengembalikan  null dan mengkonfirmasi nah unathorized
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    let finalRes = {
      isSuccess,
      message: "Unathorized",
      data: []
    };
    res.status(401).json(finalRes);
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      let finalRes = {
        isSuccess,
        message: "Your token no longer valid",
        data: []
      };

      return res.status(403).json(finalRes);
    } else {
      User.findAll({
        where: {
          id: user.id
        }
      }).then(data => {
        if (!data.length) {
          let finalRes = {
            isSuccess,
            message: "Unathorized",
            data
          };
          res.status(401).json(finalRes);
        } else {
          req.userId = user.id;
          next();
        }
      });
    }
  });
};
