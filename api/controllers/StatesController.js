/**
 * StatesController
 *
 * @description :: Server-side logic for managing states
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	state: function(req, res) {
        States.find({},function(err,data){        	
            if(data){
               res.send(data)                
            }
            else{
            	res.json({"error":"message"})
            }
        })
    },
};

