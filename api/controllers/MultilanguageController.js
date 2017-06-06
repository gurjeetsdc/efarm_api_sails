/**
 * MultilanguageController
 *
 * @description :: Server-side logic for managing multilanguages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	multilanguages : function(req,res)
	{	//console.log("hello", req);
		console.log(id);
		multilanguage.findById(id).then(function(record){
			console.log(record);
	  	var translations = record.translations;
	  		console.log(translations);
	  	//translations.en = 'Hello';
	  	
	});
	}
};

