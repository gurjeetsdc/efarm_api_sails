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

     deleteInput: function (data, context) {
       
     return API.Model(Inputs).update(data.id,data)
        .then(function (inputs) {
            var Report;
            if(inputs){
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