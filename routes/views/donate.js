var keystone = require('keystone');
var i18next = require('i18next');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'donate';

	i18next.setDefaultNamespace('index');
	i18next.loadNamespaces('index', function(err, t) {
		view.render('donate');
	});
};
