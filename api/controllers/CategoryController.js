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
    	var categorytype = req.query.categorytype;
        console.log("issue",categorytype);

        var categorytype = typeof req.query.categorytyped !== 'undefined' ? req.query.categorytype : null;
        if (categorytype === null) {
            res.status(400).jsonx({
                success: false,
                error: 'Invalid type of category.'
            });
        }

        Category.findOne({
            categorytype: categorytype
        }).exec(function(err, category) {
            if (err || !category) {
                res.status(400).jsonx({
                    success: false,
                    error: err
                });
            } else {
                

            }
        })
        
    }
};

