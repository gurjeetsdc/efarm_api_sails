var Promise = require('bluebird'),
    promisify = Promise.promisify;

    module.exports = {

    saveEquip: function (data, context) { // add  equipment api
        console.log(data);
    },

     deleteEquip: function (data, context) { //soft delete equipment api
       
     return API.Model(Equipment).update(data.id,data)
        .then(function (equipment) {
            var report;
            if(equipment){
                report = {"sucess": {
                            "Code": 200,
                            "Message": "Deleted"
                            }}
            }else{
                report = {"error": {
                            "Code": 301,
                            "Message": "Faild"
                            }}
            }
            return {
                    "Status": true,
                     report
                };
        });
    },
   
};
