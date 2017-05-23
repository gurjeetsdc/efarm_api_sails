/**
  * #DESC:  In this class/files crops related functions
  * #Request param: Crops add form data values
  * #Return : Boolen and sucess message
  * #Author: Rohitk.kumar
  */

var Promise = require('bluebird'),
    promisify = Promise.promisify;
var constantObj = sails.config.constants;

module.exports = {

    save: function (data, context) {
        var date = new Date();
        return API.Model(Crops).create(data)
        .then(function (crop) {
            var result;
            if(crop){
                result = {
                            "Status": true,
                            "Code": 200,
                            "Message": constantObj.crops.ADDED_CROP,
                            "data": crop,
                        }
                
            }else{
                result = {
                           "Status": false,
                           "Code": 301,
                           "Message": "Faild"
                           }
            }

            return result;

        });
    },
    list: function (data, context) {
        
        return Crops.find({"isDeleted":false}).populate('user').populate('category')
        .then(function (crops) {
            var result;
            if(crop){
                result = {
                            "Status": true,
                            "Code": 200,
                            "Message": "OK",
                            "data": crop,
                        }
                
            }else{
                result = {
                           "Status": false,
                           "Code": 301,
                           "Message": "Faild"
                           }
            }
            return result;

        });
    },
    update: function (data, context) {
       
        return API.Model(Crops).update(data.id,data)
        .then(function (crop) {
            var Report;
            if(crop){
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
                    "Data": crop,
                     Report
                };
        });
    },
    delete: function (data, context) {
       
     return API.Model(Crops).update(data.id,data)
        .then(function (crop) {
            var Report;
            if(crop){
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
    changeStatus: function (data, context) {
       
     return API.Model(Crops).update(data.id,data)
        .then(function (crop) {
            var Report;
            if(crop){
                Report = {"sucess": {
                            "Code": 200,
                            "Message": "StatusUpdated"
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
    get: function (data, context) {

        return API.Model(Crops).findOne(data.id)
        .then(function (crop) {
            var Report;
            
            if(crop){
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
                    "Data": crop,
                     Report
                };
        });
    },
  




 
}; // End Crops service class