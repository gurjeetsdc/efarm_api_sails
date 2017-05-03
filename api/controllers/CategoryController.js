/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	delete: function(req,res){
	  API(CategoryService.deleteCategory,req,res);
    }

};

