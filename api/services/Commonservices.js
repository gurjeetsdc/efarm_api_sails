var Promise = require('bluebird'),
    promisify = Promise.promisify;

module.exports = {

	records: function(data , context)// action to perform find all type in category  
	{
		var type = 	data.type;
		var status;
	 return Category.find({category_type:type}) // find the type in category model
	        .then(function (record) {
	        	var report;
            if(record.length != 0){// check the length of record
                report = {"sucess": {
                            "Code": 200,
                            "Message": "OK"
                            }}
                            status = true;
            }else{

                report = {"error": {
                            "Code": 301,
                            "Message": "Record not found"
                            }}
                            status = false;
            }

            return {
                    "Status": status,
                    "Data": record,
                     report
                };
	        	
                
		});

	  }
};