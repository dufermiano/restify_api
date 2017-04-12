'use strict';

const helpers = require('../config/helperFunctions'),
      UserModel = require('../models/UserModel');

module.exports = function(server){

    server.get('/', (req, res, next)=>{

        UserModel.find({}, function (err, users) {
            helpers.success(res, next, users);
        });
    });

    server.get('/users/:id', function (req, res, next){

        req.assert('id', 'Id is required and must be numeric').notEmpty();
        let errors = req.validationErrors();

        if(errors){
            helpers.failure(res, next, errors[0], 400);
        }
        UserModel.findOne({ _id: req.params.id}, function (err, user) {

            if(err){
                console.log(err);
                helpers.failure(res, next, err, 500);
            }
            if(user === null ){
                helpers.failure(res, next, 'The specified user could not be found', 404);
            }

            helpers.success(res, next, user);
        });
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

        let user = new UserModel();
        user.first_name = req.params.first_name;
        user.last_name = req.params.last_name;
        user.user_email = req.params.user_email;
        user.career = req.params.career;
        user.save(function (err) {
            helpers.failure(res, next, 'Unable to save users on the database', 500);
        });
        helpers.success(res, next, user);

    });

    server.put('/users/:id', (req, res, next)=>{

        req.assert('id', 'Id is required and must be numeric').notEmpty();
        let errors = req.validationErrors();

        if(errors){
            helpers.failure(res, next, errors[0], 400);
        }

        UserModel.findOne({ _id: req.params.id}, function (err, user) {

            if(err){
                console.log(err);
                helpers.failure(res, next, err, 500);
            }

            if(user === null ){
                helpers.failure(res, next, 'The specified user could not be found', 404);
            }

            let updates = req.params;
            delete updates.id;

            for (let field in updates){
                user[field] = updates[field];
            }

            user.save(function (err) {
                helpers.failure(res, next, 'Unable to save users on the database', 500);
            });

            helpers.success(res, next, user);
        });



    });

    server.del('/users/:id', (req, res, next)=>{
        req.assert('id', 'Id is required and must be numeric').notEmpty();
        let errors = req.validationErrors();

        if(errors){
            helpers.failure(res, next, errors[0], 400);
        }
        UserModel.findOne({ _id: req.params.id}, function (err, user) {

            if(err){
                console.log(err);
                helpers.failure(res, next, err, 500);
            }

            if(user === null ){
                helpers.failure(res, next, 'The specified user could not be found', 404);
            }
            user.remove(function (err) {
                helpers.failure(res, next, 'Unable to save users on the database', 500);
            });

            helpers.success(res, next, user);
        });
    });
};


