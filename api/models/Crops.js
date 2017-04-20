/**
 * Crops.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */


module.exports = {
    autoCreatedAt: true,
    autoUpdatedAt: true,
    attributes: {
  		
  		user_id:{
	      model:'users'
	    },

  		name: {
            type: 'string',
            required: true
        },     

        category: {
            type: 'string'
        },

        variety: {
            type: 'string'
        },


        price: {
            type: 'integer'
        },

        grade: {
            type: 'string'
        },

        color: {
            type: 'string'
        },

        size: {
            type: 'string'
        },

        other_speciality: {
            type: 'string'
        },

        availibility: {
            type: 'string'
        },

        packaging: {
            type: 'string'
        },

        supply_ablity: {
            type: 'string'
        },

        destination_shipping: {
            type: 'string'
        },

        pack_size: {
            type: 'string'
        },

        quantity_per_pack: {
            type: 'string'
        },

        label: {
            type: 'string'
        },

        payment_method: {
            type: 'string'
        },

        moq: {
            type: 'string'
        },

        average_lead_time: {
            type: 'string'
        },

        additional_info: {
            type: 'string'
        },

        terms: {
            type: 'string'
        },

        image: {
            type: 'string'
        },

        lat: {
            type: 'string'
        },

        lng: {
            type: 'string'
        },
        status: {
            type: 'string',
            enum: ['Active', 'Deactive']
        },
        isDeleted: {
            type: 'boolean',
            defaultsTo:false
        }

        // service_fee: {
        //     type: 'integer'
        // },

        // service_fee_type: {
        //     type: 'string'
        // },

        // discount_type: {
        //     type: 'string'
        // },

        // discount_value: {
        //     type: 'integer'
        // },
        
        // currency_cd: {
        //     type: 'string',
        // },
        
        // timezone: {
        //     type: 'string'
        // },
        
        // address_line1: {
        //     type: 'text'
        // },

        // address_line2: {
        //     type: 'text'
        // },

        // city: {
        //     type: 'string'
        // },

        // state: {
        //     type: 'string'
        // },

        // postal_code: {
        //     type: 'string'
        // },

        // country: {
        //     type: 'string'
        // },
  }
};

