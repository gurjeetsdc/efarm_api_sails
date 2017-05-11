/**
 * LandController
 *
 * @description :: Server-side logic for managing lands
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	 add: function(req,res){
      var land = req.body;
      console.log(land);

    },
     delete: function(req,res){
    	// action generated when delete api hit
	  API(LandServices.deleteLand,req,res);
    },  

    getAllLands: function(req, res, next) {

		var page        = req.param('page');
		var count       = req.param('count');
		var skipNo      = (page - 1) * count;
		var search      = req.param('search');
		var query       = {};

		var sortBy    	= 'createdAt';
		var sortOrder 	= -1;	

		query.isDeleted = 'false';

		if (search) {
		   query.$or = [
		       {
		            expected_price: {
		                'like': '%' + search + '%'
		            }
		        },
		        {
		            khasra_no: {
		                'like': '%' + search + '%'
		            }
		        },
		        {
		            location: {
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

		Land.count(query).exec(function(err, total) {
		   if (err) {
		       return res.status(400).jsonx({
		           success: false,
		           error: err
		       });
		   } else {
		       Land.find(query).populate('category').populate('user').sort({
		           sortBy: sortOrder
		       }).skip(skipNo).limit(count).exec(function(err, lands) {
		            if (err) {
		                return res.status(400).jsonx({
		                   success: false,
		                   error: err
		                });
		            } else {
		                return res.jsonx({
		                    success: true,
		                    data: {
		                        lands: lands,
		                        total: total
		                    },
		                });
		            }
		       })
		   }
		})
	},



};

