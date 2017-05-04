/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: function(req,res){
        API(Registration.registerUser,req,res);
    },
    getUsers: function(req, res, next) {
    	Users.find().exec(function (err, usersNamedFinn){
			  if (err) {
			    return res.serverError(err);
			  }
			  sails.log('Wow, there are %d users named Finn.  Check it out:', usersNamedFinn.length, usersNamedFinn);
			  return res.json(usersNamedFinn);
		});
    },
    getAllUsers: function(req, res, next) {
	    console.log('req.body********', req.body);
	    /*
	   	if( req.body.page !==  undefined  ) { 
	   		console.log('undefined');
	   	}else{
	   		console.log('definded');
	   	} */	
	    
	    var page   =  1	;
	    var count  = 50;
	    var skipNo = (page - 1) * count;
	    var search = '';
	    var query  = {};

	   // query.isDeleted = 'false';

	   if (search) {
	       query.$or = [
	           {
	                name: {
	                    'like': '%' + search + '%'
	                }
	            },
	            {
	                usage: {
	                    'like': '%' + search + '%'
	                }
	            },
	            {
	                modelyear: {
	                    'like': '%' + search + '%'
	                }
	            },
	            {
	                rentSell: {
	                    'like': '%' + search + '%'
	                }
	            }
	            
	       ]
	   }

	   Users.count(query).exec(function(err, total) {
	       if (err) {
	           return res.status(400).jsonx({
	               success: false,
	               error: err
	           });
	       } else {
	           console.log("total*******", total);
	           Users.find(query).sort({
	               'createdAt': -1
	           }).skip(skipNo).limit(count).exec(function(err, users) {
	               	if (err) {
	                   	return res.status(400).jsonx({
	                       success: false,
	                       error: err
	                   	});
	               	} else {
	                   	return res.jsonx({
	                       	success: true,
	                       	data: {
	                            users: users,
	                       		total: total
	                       	},
	                   	});
	               	}
	           })
	       }
	   })
	},
    register: function(req,res){
    API(Registration.registerUser,req,res);
    },
    'verify/:email': function(req,res){
        API(Registration.verifyUser,req,res);
    },
    current: function(req,res){
        API(Registration.currentUser,req,res);
    }
};