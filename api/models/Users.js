/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var promisify = require('bluebird').promisify;
var bcrypt    = require('bcrypt-nodejs');

module.exports = {
    autoCreatedAt: true,
    autoUpdatedAt: true,

    attributes: {
        firstName: {
            type: 'string',
            maxLength: 100
            //required: true
        },
        
        lastName: {
            type: 'string',
            maxLength: 100
            //required: true
        },     

        username: {
            type: 'email',
            unique: true,
            maxLength: 100,
            required: true
        },

        mobile: {
            type: 'integer',
            maxLength: 18
            //required: true
        },

        city: {
            type: 'string',
            //required: true
        },

        pincode: {
            type: 'integer',
            //required: true
        },

        state: {
            type: 'string',
            //required: true
        },

        district: {
            type: 'string',
            //required: true
        },

        lat: {
            type: 'float'
        },

        lng: {
            type: 'float'
        },

        password: {
            type: 'string',
            required: true,
            columnName: 'encryptedPassword',
            minLength: 8
        },

        date_verified: {
            type : 'date'
        },

        roles: {
            type: 'string',
            enum: ['SA', 'A','U'],
            defaultsTo: 'U'
            // required: true
        },

        isDeleted : {
            type: 'Boolean',
            defaultsTo: false
        },

        comparePassword: function(password) {
            return bcrypt.compareSync(password, this.password);
        },

        toJSON: function() {

            var obj = this.toObject();
            delete obj.password;

            return obj;
        }

    },

    beforeCreate: function(user, next) {
        console.log("beforecreate",user);
        if (user.hasOwnProperty('password')) {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
            next(false, user);

        } else {
            next(null, user);
        }
    },


    beforeUpdate: function(user, next) {
        if (user.hasOwnProperty('password')) {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
            next(false, user);
        } else {
            next(null, user);
        }
    },

    authenticate: function (username, password) {
        console.log("jjjj",username,password);
        return API.Model(Users).findOne({username: username}).then(function(user){
            return (user && user.date_verified && user.comparePassword(password))? user : null;
        });
    }

};