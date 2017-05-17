var Promise = require('bluebird'),
    promisify = Promise.promisify;
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var bcrypt    = require('bcrypt-nodejs');
var constantObj = sails.config.constants;

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
        email = options.username,
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
    registerUser: function (data, context) {
        var date = new Date();
        
        if((!data.firstName) || typeof data.firstName == undefined){ 
            return {"success": false, "error": {"code": 404,"message": constantObj.messages.FIRSTNAME_REQUIRED} };
        }
        if((!data.lastName) || typeof data.lastName == undefined){ 
            return {"success": false, "error": {"code": 404,"message": constantObj.messages.LASTNAME_REQUIRED} };
        }
        if((!data.username) || typeof data.username == undefined){ 
            return {"success": false, "error": {"code": 404,"message": constantObj.messages.USERNAME_REQUIRED} };
        }
        if((!data.mobile) || typeof data.mobile == undefined){ 
            return {"success": false, "error": {"code": 404,"message": constantObj.messages.MOBILE_REQUIRED} };
        }

        return Users.findOne({username:data.username}).then(function (user) {
            
            if (user !== undefined) {
                return {"success": false, "error": {"code": 301,"message": constantObj.messages.USER_EXIST} };                   
            } else {
                if(data.roles == 'SA' || data.roles == 'A'){
                    data['roles'] = data.roles;
                    if((!data.password) || typeof data.password == undefined){ 
                        return {"success": false, "error": {"code": 404,"message": constantObj.messages.PASSWORD_REQUIRED} };
                    }

                } else {
                    data['roles'] = 'U';
                    if(!data['password']){
                        data['password'] = generatePassword();
                    }
                }

                data['date_registered'] = date;

                if(data.mobile){
                    console.log("type is",typeof data.mobile);
                    if(typeof data.mobile == 'string'){
                        var phExpression = /^\d+$/;
                        if(data.mobile.match(phExpression)) {
                            if(data.mobile.length>10 || data.mobile.length<10){
                                return {"success": false, "error": {"code": 412,"message": constantObj.messages.PHONE_NUMBER} };
                            }

                            data['mobile'] = data.mobile;
                            
                        } else {
                            return {"success": false, "error": {"code": 412,"message": constantObj.messages.PHONE_INVALID} };                
                        } 
                    } else {
                        var mobile = data.mobile.toString();
                            if(mobile.length>10 || mobile.length<10){
                                return {"success": false, "error": {"code": 412,"message": constantObj.messages.PHONE_NUMBER} };
                            } else {
                                data['mobile'] = data.mobile;
                            }
                    }                      
                }
                data["fullName"] = data.firstName + ' ' + data.lastName;
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
                
            }
        })

    },
    signupUser: function (data, context) {
       
            data['roles'] = 'U';
            if(!data.password){

                data['password'] = generatePassword();

            }
            
                if( (!data.username) ){
                    //return res.status(400).json({"error": "Fields required."});
                  return {"success": false, "error": {"code": 404,"message": constantObj.messages.REQUIRED_FIELD} };

                }
            
            return Users.findOne({username:data.username}).then(function (user) {
                if( user != undefined ){

                    return {"success": false, "error": {"code": 301,"message": constantObj.messages.USER_EXIST} };                

                }else{
                    var date = new Date();
                    data['date_registered'] = date;
                    data['date_verified'] = date;
                    data["fullName"] = data.firstName + ' ' + data.lastName;
                    data["email"] = data.username
                    var OTP = Math.floor(100001 + Math.random() * 900001);
                    data['otp'] = OTP;

                   // console.log("sign up ");
                        return API.Model(Users).create(data).then(function (user) {

                            return {success: true, code:200, message: constantObj.messages.SUCCESSFULLY_REGISTERED, data: user};

                        });
                }
            });
    },
    signinUser: function (data, context) {
        //console.log(data);
        let username = data.username;
         return Users.findOne({username:username,otpVerified:'Y'}).then(function (user) {
            
          if( user == undefined ){
              return {"success": false, "error": {"code": 404,"message": constantObj.messages.WRONG_USERNAME} };
          }
            if( !bcrypt.compareSync(data.password, user.password) ){
                return {"success": false, "error": {"code": 404,"message": constantObj.messages.WRONG_PASSWORD} };
            }else{
                return Tokens.generateToken({
                    client_id: data.client_id,
                    user_id: user.id
                }).then(function (token) {
                    //console.log(token);
                    return { user_id: user.id,
                             name: user.fullName,
                             access_token:token.access_token, 
                             refresh_token: token.refresh_token,
                             expires_in: token.calc_expires_in(),
                             token_type: "Bearer"};
                });
            }

        });
    },
    checkOtpUser: function (data, context) {
            let userOtp = parseInt(data.number);
        return Users.findOne({otp:userOtp}).then(function (user) {
            
          if( user == undefined ){
              return {"success": false, "error": {"code": 404,"message": constantObj.messages.WRONG_OTP} };
          }
            API.Model(Users).update(
                {
                    id:user.id
                },
                {
                    otpVerified: 'Y'
                }
            );

            return {
                userVerifiedByOtp: true,
                username: user.username,
                username: user.id
            }
        });
    },
    verifyUser: function (data, context) {
        console.log("in verify user",data);
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