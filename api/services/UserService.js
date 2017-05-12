/**
  * #DESC:  In this class/files EndUser related functions
  * #Author: Rishabh Gupta
  */
/*var nodemailer = require('nodemailer');
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
    emailGeneratedCode: emailGeneratedCode, //emailgeneratecode()
    generatePassword: generatePassword,   //generatepassword()
    
    save: function (data, context) {  
        var date = new Date();
        data["password"] = generatePassword();
        return API.Model(EndUser).create(data)
        .then(function (enduser) {
            return emailGeneratedCode({
                email: data.email,
                password: data.password,
                verifyURL: sails.config.security.server.url + "/users/verify/" + data.email + "?code=" + data.password,
            });

        });
    }

}; */// End Crops service class