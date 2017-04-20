/**
 * EquipmentController
 *
 * @description :: Server-side logic for managing equipment
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	add: function(req,res){
      var equipment = req.body;
      console.log(equipment);

    },
    edit: function(req,res){
       var update_equipment = req.body;
       console.log(update_equipment); 
    },
    
	
};

