const Helper = require("../helper/helper");
const Model = require("../models");
const Category = Model.category;

exports.list = (req, res) => {
  let isSuccess = false;
  let message = "";

  Category.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    }
  })
    .then(data => {
      let finalRes = {
        isSuccess: true,
        message: "success",
        data
      };
      res.status(200).json(finalRes);
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

exports.detail = (req, res) => {
  let isSuccess = false;
  let message = "";

  const { id } = req.params;

  Category.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    },
    where: {
      id
    }
  })
    .then(data => {
      if (!data.length) {
        let finalRes = {
          isSuccess,
          message: "Data is not available",
          data
        };
        res.status(200).json(finalRes);
      } else {
        let finalRes = {
          isSuccess: true,
          message: "success",
          data: data[0]
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

exports.save = (req, res) => {
  let isSuccess = false;
  let message = "";

  const { name } = req.body;
  const id = Helper.generateId();

  Category.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    },
    where: {
      name
    }
  })
    .then(data => {
      if (data.length > 0) {
        let finalRes = {
          isSuccess,
          message: `${name} already exists`,
          data: []
        };
        res.status(200).json(finalRes);
      } else {
        Category.create({
          id,
          name
        })
          .then(data => {
            let finalRes = {
              isSuccess: true,
              message: "success",
              data
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

exports.update = (req, res) => {
  let isSuccess = false;
  let message = "";

  const { id } = req.params;
  const { name } = req.body;
  Category.findAll({
    where: {
      id
    }
  }).then(data => {
    if (!data.length) {
      let finalRes = {
        isSuccess,
        message: "Data is not available",
        data: []
      };
      res.status(200).json(finalRes);
    } else {
      data = data[0];

      if (data.name === name) {
        let finalRes = {
          isSuccess,
          message: `${name} already exists`,
          data: []
        };

        res.status(200).json(finalRes);
      } else {
        Category.update(
          {
            name
          },
          {
            where: { id }
          }
        )
          .then(() => {
            Category.findOne({
              attributes: {
                exclude: ["createdAt", "updatedAt"]
              },
              where: {
                id
              }
            })
              .then(data => {
                let finalRes = {
                  isSuccess: true,
                  message: "success",
                  data
                };
                res.status(200).json(finalRes);
              })
              .catch(error => {
                let finalRes = {
                  isSuccess,
                  message: "" + error,
                  data: []
                };

                res.status(500).json(finalRes);
              });
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
    }
  });
};

exports.delete = (req, res) => {
  let isSuccess = false;
  let message = "";

  const { id } = req.params;

  Category.findAll({
    where: {
      id
    }
  })
    .then(data => {
      if (!data.length) {
        let finalRes = {
          isSuccess,
          message: "Data is not available",
          data
        };
        res.status(200).json(finalRes);
      } else {
        Category.destroy({
          where: {
            id
          }
        })
          .then(() => {
            let finalRes = {
              isSuccess: true,
              message: "success",
              data: []
            };

            res.status(200).json(finalRes);
          })
          .catch(error => {
            let finalRes = {
              isSuccess,
              message: "" + error,
              data: []
            };

            res.status(500).json(finalRes);
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
