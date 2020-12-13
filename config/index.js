require('dotenv').config();
console.log('env', process.env.NODE_ENV);
const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000
};

module.exports = { config };
