




var Promise = require('bluebird'),
    promisify = Promise.promisify;
var constantObj = sails.config.constants;

module.exports = {
	bid: function(data, context)
	{

		if(data.type == "crop"){
			data.cropId = data.itemId;
		}
		if(data.type == "equipment"){
			data.equipmentId = data.itemId;
		}
		if(data.type == "input"){
			data.inputId = data.itemId;
		}

		delete data['itemId'];
        return API.Model(Bid).create(data)
        .then(function (bid) {
        	 var result;
            if(bid){
                result = {
                            "Status": true,
                            "Code": 200,
                            "Message": constantObj.bid.ADDED_BID,
                            "data": bid,
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
	}
}