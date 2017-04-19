/**
 * Land.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: 
  	{

      user_id:{
        model:'users'
      },
  		name: {
            type: 'string',
            required: true
        },     

        description: {
            type: 'string',
        },
        isDeleted:{
            type:'boolean'
        },
	}
  	beforeFind: function(values, cb) {
        values.isDeleted = false;
        cb();
    }
};

