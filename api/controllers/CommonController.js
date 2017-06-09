var Promise = require('q');
var constantObj = sails.config.constants;
/**
 * CommonController
 *
 * @description :: Server-side logic for managing equipment
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	getDetails: function(req, res) {
		
		var query = {};
		var Model = {};
		query.isDeleted = 'false';
		
		var modelName = req.param('model');
		var Model = sails.models[modelName];

		if(modelName === 'users'){
			query.roles = "U";
		}
		
		//console.log("value is ",Model,query);
		Model.find(query).exec(function(err,response){
			if(response){
				return res.jsonx({
	                success: true,
	                data: response
	            });
			} else {
				return res.status(400).jsonx({
                   success: false,
                   error: err
                });
			}
		});
	},

	getAssets: function(req, res) {
		console.log("here");

		var query = {};
		var Model = {};
		
		var userQuery = {};
		var CategoryQuery = {};

		userQuery.isDeleted = 'false';
		userQuery.roles = 'U';
		
		CategoryQuery.isDeleted = 'false';
		CategoryQuery.type 		= req.param('type');
		
		Promise.all([

			Category.find(CategoryQuery).then(),

			Manufacturer.find().then(),	

			Users.find(userQuery).then(),				

			States.find().then(),	

		]).spread(function(Category,Manufacturer,Users,States){ 
		return res.jsonx({
	                    success: true,
	                    data: {
	                        Users : Users,
	                        Category : Category,
	                        Manufacturer : Manufacturer,
	                        States : States
	                    },
	                });

        }).fail(function(err){
        	return res.status(400).jsonx({
	                   success: false,
	                   error: err
	                });
        	//res.jsonx(err);
        	console.log("error in common controller",err);
        });
	},

	uploadImages: function(req, res) {
		var fs = require('fs');
		//var path = require('path');
		var uuid = require('uuid');
		var randomStr = uuid.v4();
		var date = new Date();
		var currentDate = date.valueOf();
		


		//console.log("req is ", req.body.type, req);
		var modelName = req.body.type;
		//var modelName = 'crops';
		
		var Model = sails.models[modelName];
		var name = randomStr + "-" + currentDate;

		var imagedata = req.body.data;
		imageBuffer = this.decodeBase64Image(imagedata);

		var imageType = imageBuffer.type;
		var typeArr = new Array();
		typeArr = imageType.split("/");
		var fileExt = typeArr[1];


		var size = Buffer.byteLength(imagedata,"base64");			
		var i = parseInt(Math.floor(Math.log(size) / Math.log(1024)));
	    var test = Math.round(size / Math.pow(1024, i),2);
		console.log("tt",test,size);
		
		
		if((size <= 1024) || (size <= 1048576) || (size <= 10737418)){
			console.log("accepted images");
			if((fileExt === 'jpeg') || (fileExt === 'JPEG') || (fileExt === 'JPG') || (fileExt === 'jpg') || (fileExt === 'PNG') || (fileExt === 'png')) {
				if (imageBuffer.error) return imageBuffer.error;

				var fullPath = name + '.'+ fileExt ;

				var imagePath = '/images/' + modelName + '/' + name + '.' + fileExt;
				
				var uploadLocation = 'assets/images/' + modelName + '/' + name + '.' + fileExt ;
	            var tempLocation = '.tmp/public/images/'+ modelName + '/' + name + '.' + fileExt ;

				fs.writeFile('assets/images/'+modelName + '/'+ name + '.'+ fileExt, imageBuffer.data, function(imgerr, img) {
					if (imgerr) {
						res.status(400).json({
							"status_code": 400,
							"message": imgerr
						});
					} else {
	            		fs.createReadStream(uploadLocation).pipe(fs.createWriteStream(tempLocation));
						//console.log("fullPath",fullPath);
						return res.jsonx({
		                    success: true,
		                    data: {
		                        fullPath : fullPath,
		                        imagePath : imagePath,
		                        "message":constantObj.messages.SUCCESS
		                    },
		                });
					}

				});
			
			} else {
			
				res.status(400).json({
					"status_code": 400,
					"message": constantObj.messages.INVALID_IMAGE
				});
			}

		} else {
				console.log("more then 10 mb");
			res.status(400).json({
				"status_code": 400,
				"message": constantObj.messages.SIZE
			});
		}
	},
   	
	/*function to decode base64 image*/
	decodeBase64Image: function(dataString) {
		var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
			response = {};
		if (matches) {

			if (matches.length !== 3) {
				return new Error('Invalid input string');
			}

			response.type = matches[1];
			response.data = new Buffer(matches[2], 'base64');
		} else {
			response.error = constantObj.messages.INVALID_IMAGE;
		}

		return response;
	},
// delete image
	deleteimg : function(req,res) {
		var fs = require('fs');
		var modelName = req.body.modelname;
		var Model = sails.models[modelName];
		var name = req.body.image;
		var itemId = req.body.id;

		let query = {};
		query.id = itemId;
		let reqImage = req.body.image;

		var uploadLocation = 'assets/images/' + modelName + '/' + name ;
	    var tempLocation = '.tmp/public/images/'+ modelName + '/' + name ;

		var newImg = [];
		Model.find(query).exec(function(err, data) {
		data.forEach(function(element) {
    		if(data) {
				async.each(element.images, function(image, callback) {
            		
            		if(reqImage != image)
            		{
            				
            			newImg.push(image);
            		}
				Model.update({id:itemId},{images:newImg},function(err,imager){
					if(err)
					{
						return res.status(400).jsonx({
		                    success: false,
		                    error: err
		                });
					}
					else
					{
						fs.unlink(uploadLocation, (err) => {
				        if (err) {
				            	console.log("failed to delete local image:"+err);
				        } else {
								fs.unlink(tempLocation, (error) => {
				        		if(error){
				        			console.log("failed to delete local image:" +error);	
				        		} else {
				            		console.log('successfully deleted local image');                                
				        		}
								});

				        	}
						});
						return res.status(200).jsonx({
	                   		success: true,
	                   		message:"Image delete successfully"
	               		 });
					}
    				
    			});
				});
			}

			});
			
		});

	},

	// soft delete
		delete: function (req, res) {			
        var modelName = req.body.modelname;
		var Model = sails.models[modelName];
		var itemId = req.body.id;
		let query = {};
		query.id = itemId;
		Model.find(query).exec(function(err, data) {
			if(err)
			{
				console.log(err);
			}
			else
			{

				Model.update({id:itemId},{isDeleted:true},function(err,data){
					if(data)
					{
						return res.status(200).jsonx({
			                success: true,
			                data:{
			                	data:data,
			                	message: constantObj.messages.DELETE
			                }
			            });
					}
					else
					{
						return res.status(301).jsonx({
							success:false,
							message:constantObj.messages.FAILED
						});
					}
		     
		    	});
			}
		    
		})
	}

}