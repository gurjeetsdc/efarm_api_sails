var Promise = require('bluebird'),
    promisify = Promise.promisify;
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transport = nodemailer.createTransport(smtpTransport({
                host: sails.config.appSMTP.host,
                port: sails.config.appSMTP.port,
                debug: sails.config.appSMTP.debug,
                auth: {
                        user: sails.config.appSMTP.auth.user, //access using /congig/appSMTP.js
                        pass: sails.config.appSMTP.auth.pass
                    }
            }));

emailGeneratedCode = function (options) { //email generated code 
    var url = options.verifyURL,
        email = options.email,
        password = options.password;

    message = 'Hello!';
    message += '<br/>';
    message += 'Your account has been created please login with following credentials.';
    message += '<br/><br/>';
    message += 'Email Id : ' + email;
    message += '<br/>';
    message += 'Password : ' + password;

    transport.sendMail({
        from: sails.config.appSMTP.auth.user,
        to: email,
        subject: 'eFarmX registration',
        html: message
    }, function (err, info) {
        console.log("errro is ",err, info);
    });

    return {
        url: url
    }
};

generatePassword = function () { // action are perform to generate random password for user 
    var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-=+;:,.?",
    retVal = "";
    
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
};

module.exports = {
    
    emailGeneratedCode: emailGeneratedCode,
    currentUser: function(data,context){
      return context.identity;
    },
    registerUser: function (data,context,next) {
        var date = new Date();
        
        if(data.roles == 'SA' || data.roles == 'A'){
            data['roles'] = data.roles;
        } else {
            data['roles'] = 'U';
            if(!data['password']){
                data['password'] = generatePassword();
            }
        }

        data['date_registered'] = date;
        console.log("console is in register service",data);
        return API.Model(Users).create(data).then(function (user) {
            context.id = user.username;
            context.type = 'Email';
            return Tokens.generateToken({
                user_id: user.id,
                client_id: Tokens.generateTokenString()
            });
        }).then(function (token) {
            return emailGeneratedCode({
                id: context.id,
                type: context.type,
                username: data.username,
                password: data.password,
                verifyURL: sails.config.security.server.url + "/user/verify/" + data.username + "?code=" + token.code
            });
        });

    },
    signupUser: function (data, context) {
       
        var date = new Date();
        
            data['roles'] = 'U';
            if(!data.password){
                data['password'] = generatePassword();
            }
            if( (!data.email) ){ 
                /*return res.status(400).json({
                    "error": "Fields required."
                });*/
                return {"success": false, "error": {"code": 404,"message": "Fields required"} };
            }
        
        data['date_registered'] = date;
        var OTP = Math.floor(100001 + Math.random() * 900001);
        data['otp'] = OTP;
        /*console.log(val);
        console.log(data);*/
        return API.Model(Users).create(data).then(function (user) {
            
            return {
                     success: true,
                     message: "Signed up",
                     data: user,
                    };
        });

    },
    verifyUser: function (data, context) {
       
        return Tokens.authenticate({
            code: data.code,
            type: 'verification',
            username: data.username
        }).then(function (info) {
            var date = new Date();
            if (!info) return Promise.reject('Unauthorized');

            API.Model(Users).update(
                {
                    username: info.identity.username
                },
                {
                    date_verified: date
                }
            );

            return {
                verified: true,
                username: info.identity.username
            }
        });
    },

    registerClient: function (data, context) {
        return API.Model(Clients).create({
            client_id: Tokens.generateTokenString(),
            client_secret: Tokens.generateTokenString(),
            username: data.username
        }).then(function (client) {
            context.id = client.client_id;
            context.type = 'Client ID';

            return Tokens.generateToken({
                client_id: client.client_id
            });
        }).then(function (token) {
            return emailGeneratedCode({
                id: context.id,
                type: context.type,
                verifyURL: sails.config.security.server.url + "/clients/verify/" + data.username + "?code=" + token.code,
                username: data.username
            });
        });
    },


    verifyClient: function (data, context) {
        return Tokens.authenticate({
            type: 'verification',
            code: data.code,
            username: data.username
        }).then(function (info) {
            var date = new Date();
            if (!info) return Promise.reject('Unauthorized');

            API.Model(Clients).update(
                {
                    client_id: info.identity.client_id
                },
                {
                    date_verified: date
                }
            );

            return {
                verified: true,
                username: info.identity.username
            };
        });
    }
};