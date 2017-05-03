/**
 * EquipmentController
 *
 * @description :: Server-side logic for managing equipment
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


	
    delete: function(req,res){
    	// action generated when delete api hit
	  API(EquipmentServices.deleteEquip,req,res);
    }  
    
	
};

