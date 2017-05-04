/**
 * EndUserController
 *
 * @description :: Server-side logic for managing endusers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	add: function(req,res){
		API(EndUserService.save,req,res);
	}
	
};

