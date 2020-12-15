const apiRouter = require("express").Router();

apiRouter.use("/campaign", require("./campaign"));

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

apiRouter.use(unknownEndpoint);

module.exports = apiRouter;
