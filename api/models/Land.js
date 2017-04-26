/**
 * Land.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    autoCreatedAt: true,
    autoUpdatedAt: true,
  attributes: 
  	{
    user_id:{
      model:'users'
      },

  	name: {
      type:'string',
      required: true
      },     

    purchase_status:{
      type:'string',
      enum: ['rent', 'sell'],
      defaultsTo: 'rent'
      },
    location:{
      type:'string',
      required: true
      },

    description: {
      type:'text',
      required: true
      },

    area:{
      type:'string',
      required: true
      },

    khasra_no:{
      type:'integer',
      required: true
      },

    expected_price:{
      type:'integer',
      required: true
      },

    term_condition:{
      type:'text'
      },

    isDeleted:{
      type:'boolean',
      defaultsTo: false
      }
	}
};