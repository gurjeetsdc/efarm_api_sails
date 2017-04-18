/**
 * InputsController
 *
 * @description :: Server-side logic for managing inputs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	delete: function(req,res){
	  API(InputService.deleteInput,req,res);
    }

};