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
		//return res.ok();
		API(BidService.bid, req ,res);
	}
};

