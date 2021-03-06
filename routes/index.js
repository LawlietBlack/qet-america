/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('routes', middleware.i18n);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = function(app) {

	// Views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.get('/gallery', routes.views.gallery);
	app.all('/contact', routes.views.contact);
	app.get('/documents', routes.views.documents);
	app.get('/donate', routes.views.donate);
	app.get('/about', routes.views.about);
	app.get('/enquiries', middleware.requireSuperUser, routes.views.enquiry);
	app.delete('/enquiries/:enquiry', middleware.requireSuperUser, function(req, res) {
		keystone.list('Enquiry').model.findById(req.params.enquiry)
		.remove(function(err) {
			if(err) res.status(404).json({error: "not found"});
			else res.send("DELETED");
		});
	});
	app.get('/backup.tar', middleware.requireSuperUser, routes.views.backup);
	// app.get('/:parent/:slug?', routes.views.page);
	app.get('/:slug', routes.views.page);
};
