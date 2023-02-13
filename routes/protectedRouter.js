const express = require("express");
const protectedRouter = express.Router();
const User = require('../models/userModel')

protectedRouter.get('/user', (req, res) => {
    User.findById(req.user.id, (err, user) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.send({ user });
    });
  });

  module.exports = protectedRouter;