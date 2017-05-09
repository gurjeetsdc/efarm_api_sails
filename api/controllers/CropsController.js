/**
 * CropsController
 *
 * @description :: Server-side logic for managing crops
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

	add: function(req,res){
    API(CropService.save,req,res);
  },
  listing: function(req,res){
    API(CropService.list,req,res);
  },
  update: function(req,res){
    API(CropService.update,req,res);
  },
  show: function(req,res){
    API(CropService.get,req,res);
  },
  delete: function(req,res){
	  API(CropService.delete,req,res);
  },
  changestatus: function(req,res){
	  API(CropService.changeStatus,req,res);
  },

	
};