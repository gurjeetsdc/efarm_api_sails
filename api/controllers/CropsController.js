/**
 * CropsController
 *
 * @description :: Server-side logic for managing crops
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

    add: function(req, res) {
        API(CropService.save, req, res);
    },
    listing: function(req, res) {
        API(CropService.list, req, res);
    },
    update: function(req, res) {
        API(CropService.update, req, res);
    },
    show: function(req, res) {
        API(CropService.get, req, res);
    },
    delete: function(req, res) {
        API(CropService.delete, req, res);
    },
    changestatus: function(req, res) {
        API(CropService.changeStatus, req, res);
    },

    getAllCrops: function(req, res, next) {

        var search = req.param('search');
        var sortBy = req.param('sortBy');
        var page = req.param('page');
        var count = req.param('count');
        var skipNo = (page - 1) * count;
        var query = {};

        if (sortBy) {
            sortBy = sortBy.toString();
        } else {
            sortBy = 'createdAt desc';
        }

        query.isDeleted = 'false';

        if (search) {
            query.$or = [{
                    name: {
                        'like': '%' + search + '%'
                    }
                }, {
                    grade: {
                        'like': '%' + search + '%'
                    }
                }, {
                    paymentPreference: {
                        'like': '%' + search + '%'
                    }
                }, {
                    verified: {
                        'like': '%' + search + '%'
                    }
                }, {
                    district: {
                        'like': '%' + search + '%'
                    }
                }, {
                    price: parseInt(search)
                }

            ]
        }

        Crops.count(query).exec(function(err, total) {
            if (err) {
                return res.status(400).jsonx({
                    success: false,
                    error: err
                });
            } else {
                Crops.find(query).populate('category').populate('seller').sort(sortBy).skip(skipNo).limit(count).exec(function(err, crops) {
                    if (err) {
                        return res.status(400).jsonx({
                            success: false,
                            error: err
                        });
                    } else {
                        return res.jsonx({
                            success: true,
                            data: {
                                crops: crops,
                                total: total
                            },
                        });
                    }
                })
            }
        })
    }
};
