/**
 * EndUserController
 *
 * @description :: Server-side logic for managing endusers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	delete: function(req,res){
	  API(EndUserService.deleteUser,req,res);
    }
	
};

