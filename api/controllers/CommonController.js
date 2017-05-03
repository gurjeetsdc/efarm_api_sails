/**
 * CommonController
 *
 * @description :: Server-side logic for managing commons
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	findcategory:function(req, res)
	{
		
		//	console.log(model);
	 	API(Commonservices.records,req,res);
	}
};
	/*records: function(req, res, next)
	{
		console.log("body", req.body);
		var model = req.body.model;
		var type = 	req.body.type;
		model.find(type).exec(function(err , record)
		{
			if (err) 
			{
                return res.status(400).jsonx({
                    success: false,
                    error: err
                });
            }
            else 
            {
                return res.jsonx({
                    success: true,
                    data: {
                        record: record
                    },
                	});
            }
		});*/
	//}

	 /*getAllRecord: function(req, res, next) {
        console.log('req.body********', req.body);
        var page = req.body.page || 1,
            count = req.body.count || 50;
        var skipNo = (page - 1) * count;
       	var search = req.body.query || "";
        var query = {};
        var model = req.body.body;
        var type = req.body.type;

        query.isDeleted = 'false';

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

        model.count(query).exec(function(err, total) {
            if (err) {
                return res.status(400).jsonx({
                    success: false,
                    error: err
                });
            } else {
                console.log("total*******", total);
                model.find(query).sort({
                    'createdAt': -1
                }).skip(skipNo).limit(count).exec(function(err, records) {
                    if (err) {
                        return res.status(400).jsonx({
                            success: false,
                            error: err
                        });
                    } else {
                        return res.jsonx({
                            success: true,
                            data: {
                                records: records
                            },
                            total: total
                        });
                    }
                })
            }
        })
}*/


