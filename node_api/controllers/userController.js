'use strict';

const helpers = require('../config/helperFunctions');

//Fake Database

let users = {};
let max_users_id = 0;

module.exports = function(server){

    server.get('/', (req, res, next)=>{
        helpers.success(res, next, users);
    });

    server.get('/users/:id', (req, res, next)=>{

        req.assert('id', 'Id is required and must be numeric').notEmpty().isInt();
        let errors = req.validationErrors();

        if(errors){
            helpers.failure(res, next, errors[0], 400);
        }

        if(typeof (users[req.params.id]) === 'undefined'){
            helpers.failure(res, next, 'The user could not be found on the database', 404);
        }
        helpers.success(res, next, users[parseInt(req.params.id)]);
    });

    server.post('/users', (req, res, next)=>{

        req.assert('first_name', 'First name is a required parameter').notEmpty();
        req.assert('last_name', 'Last name is a required parameter').notEmpty();
        req.assert('user_email', 'Email must not be empty and must be a valid one').notEmpty().isEmail();
        req.assert('career', 'Must be one of the options: proggrammer, DBA, analyst').isIn(['proggrammer', 'DBA', 'analyst']);

        let errors = req.validationErrors();

        if(errors){
            helpers.failure(res, next, errors, 400);
        }

        let user = req.params;
        max_users_id++;
        user.id = max_users_id;
        users[user.id] = user;
        helpers.success(res, next, users);

    });

    server.put('/users/:id', (req, res, next)=>{

        req.assert('id', 'Id is required and must be numeric').notEmpty().isInt();
        let errors = req.validationErrors();

        if(errors){
            helpers.failure(res, next, errors[0], 400);
        }
        if(typeof (users[req.params.id]) === 'undefined'){
            helpers.failure(res, next, 'The user could not be found on the database', 404);
        }
        let user = users[parseInt(req.params.id)];
        let updates = req.params;
        for (let field in updates){
            user[field] = updates[field];
        }
        helpers.success(res, next, user);

    });

    server.del('/users/:id', (req, res, next)=>{
        req.assert('id', 'Id is required and must be numeric').notEmpty().isInt();
        let errors = req.validationErrors();

        if(errors){
            helpers.failure(res, next, errors[0], 400);
        }
        if(typeof (users[req.params.id]) === 'undefined'){
            helpers.failure(res, next, 'The user could not be found on the database', 404);
        }
        delete users[parseInt(req.params.id)];
        helpers.success(res, next, []);

    });
};


