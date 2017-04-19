/**
 * ManufacturerController
 *
 * @description :: Server-side logic for managing manufacturers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	delete: function(req,res){
	  API(ManufacturerService.deleteManufacturer,req,res);
    }
};

