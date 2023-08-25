const assert = require('node:assert');
const {Buffer} = require('node:buffer');

assert(true);

console.clear();

module.exports = Buffer.from('Hello World').toString();
