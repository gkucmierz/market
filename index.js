
var market = require('./src/market');



market.sell(1, 2200);
market.buy(0.5, 2200);
market.buy(0.25, 2300);


console.log(market.getOrderbook());
