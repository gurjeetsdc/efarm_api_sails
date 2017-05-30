/**
 * BidController
 *
 * @description :: Server-side logic for managing Bids
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	saveBid : function(req ,res)
	{
		console.log("hello");
		API(BidService.bid, req ,res);
	}
};

