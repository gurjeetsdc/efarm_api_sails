var Promise = require('q');
/**
 * CommonController
 *
 * @description :: Server-side logic for managing equipment
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	getDetails: function(req, res) {
		
		var query = {};
		var Model = {};
		query.isDeleted = 'false';
		
		var modelName = req.param('model');
		var Model = sails.models[modelName];

		if(modelName === 'users'){
			query.roles = "U";
		}
		
		//console.log("value is ",Model,query);
		Model.find(query).exec(function(err,response){
			if(response){
				return res.jsonx({
	                success: true,
	                data: response
	            });
			} else {
				return res.status(400).jsonx({
                   success: false,
                   error: err
                });
			}
		});
	},

	getAssets: function(req, res) {
		console.log("here");

		var query = {};
		var Model = {};
		
		var userQuery = {};
		var CategoryQuery = {};

		userQuery.isDeleted = 'false';
		userQuery.roles = 'U';
		
		CategoryQuery.isDeleted = 'false';
		CategoryQuery.type 		= req.param('type');

		CategoryQuery. 		= req.param('type');
		
		Promise.all([

			Category.find(CategoryQuery).then(),

			Manufacturer.find().then(),	

			Users.find(userQuery).then(),				

			States.find().then(),	

		]).spread(function(Category,Manufacturer,Users,States){ 
		return res.jsonx({
	                    success: true,
	                    data: {
	                        Users : Users,
	                        Category : Category,
	                        Manufacturer : Manufacturer,
	                        States : States
	                    },
	                });

        }).fail(function(err){
        	return res.status(400).jsonx({
	                   success: false,
	                   error: err
	                });
        	//res.jsonx(err);
        	console.log("error in common controller",err);
        });
	}

};