/*
This module allows to implement an application
with multiple environments, handling things like
api urls a api keys
*/
let env = process.env.APP_ENV || 'dev';

let config = {
	dev:    require('./development'),
	prod:   require('./production')
};

module.exports = config[env];
