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
    edit: function(req, res) {
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
        var seller = req.param('seller');
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
        if(seller){
            query.seller = seller;
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
    },

    updateBids: function(req, res) {
        
        let cropId = req.body.crop_id; 
        let userId = req.body.user_id;
        let bidAmount = req.body.bid_amount;
        let bidTime = req.body.bid_time;
        let status = req.body.status;
        let cropJson = {};
        let userJson = {};

        cropJson = {
            'user_id' : userId,
            'bid_amount' : bidAmount,
            'bid_time' : bidTime,
            'status' : status
        };

        userJson = {
            'crop_id' : userId,
            'bid_amount' : bidAmount,
            'bid_time' : bidTime,
            'status' : status
        };


        if(req.body.description){
            let description = req.body.description;
            cropJson.description = description;
        }


        let query = {};
        query.id = cropId;
        query.isExpired = false;

        console.log("query is ",query);

        Crops.findOne(query).then(function(crop){ 
            
            if(!crop.bids){
                console.log("tes");
                crop.bids = [];
            }

            crop.bids.push(cropJson);
            cropData = crop;

            Crops.update({id:crop.id},cropData).then(function(cropinfo){
                if(cropinfo){
                    Users.findOne({id:userId}).then(function(userInfo){
                        if(userInfo){
                            if(!userInfo.mybids){
                                userInfo.mybids = [];
                            }
                            userInfo.mybids.push(userJson);
                            userData = userInfo;

                            Users.update({id:userId},userData).then(function(cropinfo){
                                return res.jsonx({
                                    success: true,
                                    data: "Your bid has been successfully placed"
                                });
                            })
                        } else {
                            return res.status(400).jsonx({
                               success: false,
                               error: "User not found"
                            });
                        }
                    }) 
                } else {
                    return res.status(400).jsonx({
                       success: false,
                       error: "There is some problem to bid on this crop."
                    });
                }
            })
            .fail(function(err){
                return res.status(400).jsonx({
                   success: false,
                   error: "There is some problem to bid on this crop."
                });
            })
        })
        .fail(function(err){
            return res.status(400).jsonx({
               success: false,
               error: "There is some problem to bid on this crop."
            });
        })
    }
};
