var Promise = require('bluebird'),
    promisify = Promise.promisify;

module.exports = {

	records: function(data , context)
	{
		//console.log(data);
		var type = 	data.type;
		var status;
		//console.log(type);
	 return Category.find({category_type:type})
	        .then(function (record) {
	        	var report;
	        	//console.log(record.length);
            if(record.length != 0){
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
	        	/*if(err)
	        	{
	        		console.log(err);
	        	}*/
//	console.log(record);
                /*return {
                    success: true,
                    data: record,
                	};*/
                
		});

	  }
};