/**
 * ClientsController
 *
 * @description :: Server-side logic for managing clients
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: function(req,res){
        API(Registration.registerClient,req,res);
    },
    register: function(req,res){
        API(Registration.registerClient,req,res);
    },
    'verify/:email': function(req,res){
        API(Registration.verifyClient,req,res);
    }
};