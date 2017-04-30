/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	delete: function(req,res){
	  API(CategoryService.delete,req,res);
    },

    getCategoryList: function(req,res,next){
    	//console.log("issyue",req);
    	var categorytype = req.query.type;
        console.log("issue",categorytype);
        
    }
};

