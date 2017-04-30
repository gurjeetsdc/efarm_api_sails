/**
 * CropsController
 *
 * @description :: Server-side logic for managing crops
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

	add: function(req,res){
    API(CropService.saveCrop,req,res);
  },
  listing: function(req,res){
    API(CropService.listCrops,req,res);
  },
  update: function(req,res){
    API(CropService.updateCrop,req,res);
  },
  show: function(req,res){
    API(CropService.getCrop,req,res);
  },
  delete: function(req,res){
	  API(CropService.deleteCrop,req,res);
  },
  changestatus: function(req,res){
	  API(CropService.changeStatusCrop,req,res);
  },

	
};