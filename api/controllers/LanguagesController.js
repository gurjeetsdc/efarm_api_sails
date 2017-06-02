var constantObj = sails.config.constants;
/**
 * CommonController
 *
 * @description :: Server-side logic for managing equipment
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	getLanguage: function(req,res){

		let langCode = '';

		if(!req.param('code')) {
			langCode = "en";
		} else {
			langCode = req.param('code');
		}

		let query = {};
		query.code = langCode;

		console.log("language is",langCode);
		Languages.findOne(query).then(function(language){

			console.log("language is",language);

		})


	}
};