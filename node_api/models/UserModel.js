'use strict';

const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    id    : ObjectId,
    first_name     : String,
    last_name      : String,
    user_email     : String,
    career         : String
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;