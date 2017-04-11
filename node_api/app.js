'use strict';

const restify = require('restify'),
      server = restify.createServer(),
      setupController = require('./controllers/setupController'),
      userController = require('./controllers/userController'),
      restifyValidator = require('restify-validator'),
      mongoose = require('mongoose'),
      config = require('./config/dbConnection');

mongoose.connect(config.getMongoConnection());

setupController(server, restify, restifyValidator);
userController(server);

server.listen(8080, ()=>{

    console.log('%s listening at %s', server.name, server.url);

} );