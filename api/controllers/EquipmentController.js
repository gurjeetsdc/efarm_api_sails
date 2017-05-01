var s3 = require('s3');
const osTmpdir = require('os-tmpdir');
var formidable = require('formidable');
var AWS = require('aws-sdk');

/**
 * EquipmentController
 *
 * @description :: Server-side logic for managing equipment
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	add: function(req,res){
		//action generated when post api hit to save data
      var equipment = req.body;
      console.log(equipment);
	},

    delete: function(req,res){
    	// action generated when delete api hit
	  API(EquipmentServices.deleteEquip,req,res);
    },

    getAllEquipments: function(req, res, next) {
        console.log('req.body********', req.body);
        var page = req.body.page || 1,
            count = req.body.count || 50;
        var skipNo = (page - 1) * count;
       	var search = req.body.query || "";
        var query = {};

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

        Equipment.count(query).exec(function(err, total) {
            if (err) {
                return res.status(400).jsonx({
                    success: false,
                    error: err
                });
            } else {
                console.log("total*******", total);
                Equipment.find(query).sort({
                    'createdAt': -1
                }).skip(skipNo).limit(count).exec(function(err, equipments) {
                    if (err) {
                        return res.status(400).jsonx({
                            success: false,
                            error: err
                        });
                    } else {
                        return res.jsonx({
                            success: true,
                            data: {
                                equipments: equipments
                            },
                            total: total
                        });
                    }
                })
            }
        })
    },

    uploadImages: function(req, res) {
    	console.log("test data for req",req.session);

        var form = new formidable.IncomingForm();
    	form.keepExtensions = true;     //keep file extension
    	form.uploadDir = (__dirname+"/../../doc/upload/equipments/");  //set upload directory
    	form.keepExtensions = true;     //keep file extension
    	form.parse(req, function(err, fields, files) {

			var dateTime = new Date().toISOString().replace(/T/,'').replace(/\..+/, '').split(" ");

			console.log("datae",dateTime);

	    	// UPLOADING IMAGE TO S3 BUCKET

	    	/*var awsS3Client = new AWS.S3();
	    	var options = {
		      	s3Client: awsS3Client,
	    	};
	    	
	    	var client = s3.createClient(options);

	    	var params = {
	      		localFile: files.file.path,
		      	s3Params: {
			        Bucket: "farmx-data",
			        Key: "images/"+req.session.equipment_id+ dateTime +files.file.name,
			        ACL: 'public-read',
			        // other options supported by putObject, except Body and ContentLength.
			        // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
		      	},
	    	};

	    	var uploader = client.uploadFile(params);
	      	uploader.on('error', function(err) {
		        console.error("unable to upload:", err.stack);
		        res.json({'code': 400, 'error':err.stack});
		    });
	      	
	      	uploader.on('progress', function() {
	        	console.log("progress", uploader.progressMd5Amount,
	           	uploader.progressAmount, uploader.progressTotal);
		        var return_data = {}
		        return_data.progressMd5Amount = uploader.progressMd5Amount
		        return_data.progressAmount    = uploader.progressAmount
		        return_data.progressTotal     = uploader.progressTotal
		    });
	      	
	      	uploader.on('end', function() {
	        
	        	uploader.url = s3.getPublicUrlHttp(params.s3Params.Bucket, params.s3Params.Key);
	        	console.log("done uploading URL: "+uploader.url);

	        	var img = {};
	        	img.Title = s3.getPublicUrlHttp(params.s3Params.Bucket, params.s3Params.Key);
	        	img.Status = true;
	        	img.IsCover = false;
	        	var invn_id = fields.invn_id;              
	        
	        	/*Equipment.update({_id:invn_id},{$push:{"Images": img}},{},function(err, numAffected){
	          	
		          	if (err) {
		            	res.json(err);
		          	}else{
		            	Equipment.findOne({_id : invn_id},function(err,equipimages){
		              		if (err) {
		                		res.json(err);
		              		}else{
		                		res.json({'code':200,'equipment' : equipimages});
		              		}
		            	})
		          	}
	        	});*/
	      	//});
    	});
   	}
};

