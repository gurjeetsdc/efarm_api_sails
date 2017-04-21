/**
  * #DESC:  In this class/files EndUser related functions
  * #Author: Rishabh Gupta
  */
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
        email = options.email;

    message = 'Hello!';
    message += '<br/>';
    message += 'Please visit the verification link to complete the registration process.';
    message += '<br/><br/>';
    message += 'Account with ' + options.type + " : " + options.id;
    message += '<br/><br/>';
    message += '<a href="';
    message += url;
    message += '">Verification Link</a>';
    message += '<br/>';

    transport.sendMail({
        from: sails.config.appSMTP.auth.user,
        to: email,
        subject: 'Canadian Tire App Account Registration',
        html: message
    }, function (err, info) {
        console.log("Email Response:", info,err);
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
    saveUser: function (data, context) {  
        var date = new Date();
        data["password"] = generatePassword();
        return API.Model(EndUser).create(data)
        .then(function (enduser) {
          return emailGeneratedCode({
                email: data.email,
                password: data.password,
                verifyURL: sails.config.security.server.url + "/endusers/verify/" + data.email + "password=" + data.password,
            });
          console.log(emailGeneratedCode);
            var report;
            if(enduser){
                report = {"sucess": {
                            "Code": 200,
                            "Message": "OK"
                            }}
            }else{
                report = {"error": {
                            "Code": 301,
                            "Message": "Faild"
                            }}
            }

            return {
                    "Status": true,
                    "Data": enduser,
                     report
                };

        });
    },

     deleteUser: function (data, context) {
       
     return API.Model(EndUser).update(data.id,data)
        .then(function (user) {
            var Repor;
            if(user){
                Report = {"sucess": {
                            "Code": 200,
                            "Message": "Deleted"
                            }}
            }else{
                Report = {"error": {
                            "Code": 301,
                            "Message": "Faild"
                            }}
            }
            return {
                    "Status": true,
                     Report
                };
        });
    },
    


 
}; // End Crops service class