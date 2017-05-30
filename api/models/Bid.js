/**
 * Bid.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	autoCreatedAt: true,
    autoUpdatedAt: true,
  	attributes: {
  		cropId:{
  			model:'crops',
  		},
  		inputId:{
  			model:'inputs'
  		},  		
  		equipmentId:{
  			model:'equipment'
  		},
  		buyerId:{
  			model:'users',
  			required: true
  		},
  		amount:{
  			type:'float',
  			required: true
  		},
  		type:{
  			enum: ['crop', 'input','equipment'],
  			type:'string',
  			required: true
  		}
  	}
};

