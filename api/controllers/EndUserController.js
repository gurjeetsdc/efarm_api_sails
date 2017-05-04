/**
 * EndUserController
 *
 * @description :: Server-side logic for managing endusers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	add: function(req,res){
		API(UserService.save,req,res);
	}
	
};

