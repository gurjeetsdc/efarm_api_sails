/**
  * #DESC:  In this class/files EndUser related functions
  * #Author: Manpreet Singh
  */

var Promise = require('bluebird'),
    promisify = Promise.promisify
    ;

module.exports = {

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