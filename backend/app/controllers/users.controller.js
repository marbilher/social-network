const usersService = require("../services/users.service");


module.exports = {
    registerNew,
    login
  }

function login(req, res) {
  console.log(req.body)

  usersService.checkIfEmailExists(req.body)
    .then(response => {
      if(response.length == 1) {
        console.log(response)
        //req.body.passwordAttempt = hash it
        usersService.login(req.body, response)
      } else {
        res.status(200).send('Could not find that email.');
      }
    })
}

function registerNew(req, res) {
    usersService
      .checkIfEmailExists(req.body)
      .then(response => {
        if(response.length == 1) {
          res.status(200).send('Email already exists.');
        } else {
          usersService.registerNew(req.body)
          .then(response => {
            res.status(200).send('User registered.');
          })
          //this should be a promise from register new function
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).send(error);
      });
}