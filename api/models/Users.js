/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 * @CreatedBy   :: 
 * @Last Updated By :: Rohit.kumar
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
        },
        
        lastName: {
            type: 'string',
            maxLength: 100
        },

        fbId: {
            type: 'string',
            maxLength: 100
        },

        gId: {
            type: 'string',
            maxLength: 100
        },

        username: {
            type: 'email',
            unique: true,
            maxLength: 100,
            //required: true
        },

        mobile: {
            type: 'integer',
            maxLength: 18,
            //required: true
        },

        city: {
            type: 'string',
        },

        pincode: {
            type: 'integer',
        },

        state: {
            type: 'string',
        },

        district: {
            type: 'string',
        },

        country: {
            type: 'string',
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
        },
        domain: {
            type: 'string',
            enum: ['web', 'mobile']
        },
        deviceType: {
            type: 'string',
            enum: ['IOS', 'ANDROID']
        },
        deviceToken: {
            type: 'string',
        },
        otp: {
            type: 'integer',
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
        //console.log("beforecreate",user);
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
        return API.Model(Users).findOne({username: username}).then(function(user){
            //console.log(user);
            if(user.roles == "A" || user.roles == "SA"){
                return (user && user.date_verified && user.comparePassword(password))? user : null;
            }
            else if(user.roles == "U"){
                return (user && user.comparePassword(password))? user : null;
            }
        });
    }

};