/**
 * LandController
 *
 * @description :: Server-side logic for managing lands
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	 add: function(req,res){
      var land = req.body;
      console.log(land);

    },
     delete: function(req,res){
    	// action generated when delete api hit
	  API(LandServices.deleteLand,req,res);
    }  
};

