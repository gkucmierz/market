
// var _ = require('lodash');


var asks = []; // selling offers
var bids = []; // buying offers

// var marketMakerFee = 0.0001;
// var marketTakerFee = 0.002;


var makeAsks = function(amount, price) {
  // add offer
  asks.push({
    amount: amount,
    price: price
  });

  // keep correct order
  asks.sort(function(a, b) {
    return a.price - b.price;
  });
};

var makeBids = function(amount, price) {
  // add offer
  bids.push({
    amount: amount,
    price: price
  });

  // keep correct order
  bids.sort(function(a, b) {
    return b.price - a.price;
  });
};

var takeAsks = function(amount, price) {
  var leftAmount = amount;

  while (asks.length && leftAmount > 0) {
    if (asks[0].amount <= leftAmount) {
      leftAmount -= asks[0].amount;
      asks.shift(); // remove first
    } else {
      asks[0].amount -= leftAmount;
      leftAmount = 0;
    }
  }

  return amount - leftAmount;
};

var takeBids = function(amount, price) {
  var leftAmount = amount;

  while (bids.length && leftAmount > 0) {
    if (asks[0].amount <= leftAmount) {
      leftAmount -= bids[0].amount;
      bids.shift(); // remove first
    } else {
      bids[0].amount -= leftAmount;
      leftAmount = 0;
    }
  }

  return amount - leftAmount;
};

// public methods

// exports.setFees = function(maker, taker) {
//   marketMakerFee = maker;
//   marketTakerFee = taker;
// };

exports.getOrderbook = function() {
  return {
    asks: asks,
    bids: bids
  };
};

exports.sell = function(amount, price) {
  var takenAmount = 0;
  var leftAmount;

  // try to sell to existing offers
  if (bids.length && bids[0].price >= price) {
    takenAmount = takeBids(amount, price);
  }

  // if something left, add offer to orderbook
  leftAmount = amount - takenAmount;
  if (leftAmount > 0) {
    makeAsks(leftAmount, price);
  }

};

exports.buy = function(amount, price) {
  var takenAmount = 0;
  var leftAmount;

  // try to sell to existing offers
  if (asks.length && asks[0].price <= price) {
    takenAmount = takeAsks(amount, price);
  }

  // if something left, add offer to orderbook
  leftAmount = amount - takenAmount;
  if (leftAmount > 0) {
    makeBids(leftAmount, price);
  }

};
