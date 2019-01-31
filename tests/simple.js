var runtime = require('../js/traceur-runtime')
var jsonata = require('../js/jsonata')

var data = {
  example: [
    {value: 4},
    {value: 7},
    {value: 13}
  ]
};

console.log('simple data: '+JSON.stringify(data))
var expression = jsonata('$sum(example.value)');
console.log('query expr '+expression)
var result = expression.evaluate(data);  // returns 24
console.log('simple sum: '+result);
