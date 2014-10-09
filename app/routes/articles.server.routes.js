'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	articles = require('../../app/controllers/articles');

module.exports = function(app) {
	// Article Routes
	app.route('/articles')
		.get(articles.list)//get all
		.post(users.requiresLogin, articles.create);//Need to pass requireLogin and then can post

	app.route('/articles/:articleId')
		.get(articles.read)
		.put(users.requiresLogin, articles.hasAuthorization, articles.update)//if pass requiresLogin and pass hasAuthorization then article can be updated
		.delete(users.requiresLogin, articles.hasAuthorization, articles.delete);//same as put ,it has to pass the first two things and then deleted

	// Finish by binding the article middleware
	app.param('articleId', articles.articleByID);//need this for get one article
};