/**
  * #DESC:  In this class/files crops related functions
  * #Request param: Crops add form data values
  * #Return : Boolen and sucess message
  * #Author: Rohitk.kumar
  */

var Promise = require('bluebird'),
    promisify = Promise.promisify
    ;

module.exports = {

    saveCrop: function (data, context) {
        var date = new Date();
        return API.Model(Crops).create(data)
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
    listCrops: function (data, context) {
        
        return Crops.find({"isDeleted":false}).populate('user_id')
        .then(function (crops) {
            var Report;
                Report = {"sucess": {
                            "Code": 200,
                            "Message": "OK"
                            }}
            return {
                    "Status": true,
                    "Data": crops,
                     Report
                };

        });
    },
    updateCrop: function (data, context) {
       
//console.log(data);
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
    deleteCrop: function (data, context) {
       
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
    changeStatusCrop: function (data, context) {
       
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
    getCrop: function (data, context) {

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