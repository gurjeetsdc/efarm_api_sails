/**
  * #DESC:  In this class/files EndUser related functions
  * #Author: Rishabh Gupta
  */

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var bcrypt    = require('bcrypt-nodejs');
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
    message += 'Your new password has been created successfully';
    message += '<br/><br/>';
    message += 'Email Id : ' + email;
    message += '<br/>';
    message += 'Password : ' + password;

    transport.sendMail({
        from: sails.config.appSMTP.auth.user,
        to: email,
        subject: 'eFarmX password reset',
        html: message
    }, function (err, info) {
        
    });

    return {
        success: true,
        data: {
            "message": "Password has been sent to Email"
        }
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
    forgotPassword: function (data, context) {
        return Users.findOne({email: data.email})
            .then(function(data){
                if(data===undefined){
                    return {
                        success: false,
                        error: {
                            "code": 404,
                            "message": "No such user exist"
                        }
                    }
                }
                else{
                    var password = generatePassword()
                    var encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
                    return Users.update({email: data.email},{encryptedPassword:encryptedPassword})
                            .then(function(data){
                                return emailGeneratedCode({
                                    email: data[0].email,
                                    password: password,
                                    verifyURL: sails.config.security.server.url + "/users/verify/" + data[0].email + "?code=" + data[0].password,
                                })
                            })
                    }
                
            })
    },
    changePassword: function(data, context){
       
        let password = data.password;
 
        let newPassword = data.newPassword;
        let confirmPassword = data.confirmPassword;
        if(newPassword != confirmPassword)
        {
             return {
                        error: {
                            "code": 404,
                            "message": "new password and confirmPassword does not match "
                        }
                    }
        }    

        return Users.findOne({id: data.id})
        .then(function(user){
            
           
            if( !bcrypt.compareSync(data.password, user.password) ){
                return {"success": false, "error": {"code": 404,"message": "Wrong Old Password "} };
            }
            else
            {
               var encryptedPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
               return Users.update({id: data.id},{encryptedPassword:encryptedPassword})
                .then(function (user) {
                    console.log(user);
                return {"success": true, "code":200, "message": "Password has been changed"};

                /*var Report;
                if(user){
                    Report = {"sucess": {
                                "Code": 200,
                                "Message": "OK"
                                }}
                }else{
                    Report = {"error": {
                                "Code": 301,
                                "Message": "Faild"
                                }}
                }

                return {
                        "Status": true,
                        "Data": user,
                         Report
                    };*/

            });
            }
        })
    }

}; 

