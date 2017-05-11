/**
 * InputsController
 *
 * @description :: Server-side logic for managing inputs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	delete: function(req,res){
	  API(InputService.deleteInput,req,res);
    },

    getAllInputs: function(req, res, next) {

    var page        = req.param('page');
    var count       = req.param('count');
    var skipNo      = (page - 1) * count;
    var search      = req.param('search');
    var query       = {};

    var sortBy      = 'createdAt';
    var sortOrder   = -1; 



    query.isDeleted = 'false';

    if (search) {
       query.$or = [
           {
                name: {
                    'like': '%' + search + '%'
                }
            },
            {
                units: {
                    'like': '%' + search + '%'
                }
            },
            {
                additionalInformation: {
                    'like': '%' + search + '%'
                }
            }
       ]
    }

    Inputs.count(query).exec(function(err, total) {
       if (err) {
           return res.status(400).jsonx({
               success: false,
               error: err
           });
       } else {
           Inputs.find(query).populate('category').populate('user').populate('manufacturer').sort({
               sortBy: sortOrder
           }).skip(skipNo).limit(count).exec(function(err, inputs) {
                if (err) {
                    return res.status(400).jsonx({
                       success: false,
                       error: err
                    });
                } else {
                    return res.jsonx({
                        success: true,
                        data: {
                            inputs: inputs,
                            total: total
                        },
                    });
                }
           })
       }
    })
  }

};