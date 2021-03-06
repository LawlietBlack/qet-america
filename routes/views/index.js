var keystone = require('keystone');

var i18next = require('i18next');

var News = keystone.list('News');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	i18next.setDefaultNamespace('index');
	i18next.loadNamespaces('index', function(err, t) {
		// locals.section is used to set the currently selected
		// item in the header navigation.
		locals.section = 'home';
		locals.language = req.language;
		News.model.find({
			'state': 'published',
			'language': req.language
		})
		.limit(5)
		.sort('-publishedDate')
		.exec(function(err, news) {
			locals.news = news;
			view.render('index');
		});
	});
};
