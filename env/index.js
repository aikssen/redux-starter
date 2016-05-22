var env = process.env.APP_ENV || 'dev';

var config = {
	dev:    require('./development'),
	prod:   require('./production')
};

module.exports = config[env];
