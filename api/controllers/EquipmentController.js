/**
 * EquipmentController
 *
 * @description :: Server-side logic for managing equipment
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	add: function(req,res){
		//action generated when post api hit to save data
      var equipment = req.body;
      console.log(equipment);
	},
    delete: function(req,res){
    	// action generated when delete api hit
	  API(EquipmentServices.deleteEquip,req,res);
    }     
	
};

