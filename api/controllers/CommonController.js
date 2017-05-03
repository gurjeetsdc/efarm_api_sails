/**
 * CommonController
 *
 * @description :: Server-side logic for managing commons
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	findcategory:function(req, res)
	{
		//	action genertaed when api hit to find the type of category
	 	API(Commonservices.records,req,res);
	}
};
	

