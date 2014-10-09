'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
	function($scope, $stateParams, $location, Authentication, Articles) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var article = new Articles({
				title: this.title,
				content: this.content
			});
			console.log('article',article);
			article.$save(function(response) {
												//$promise: undefined
												//$resolved: true
												//__v: 0
												//_id: "5435defca883570000032234"
												//content: "Heeeeeelo"
												//created: "2014-10-09T01:03:56.042Z"
												//title: "four"
												//user: "5434fa818147a9696f86b789"

				$location.path('articles/' + response._id);//After I save the form, I get id back, and redirect me to that route

				$scope.title = '';//and I set title and content to empty
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			console.log('$scope.article when update', $scope.article);
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId//$stateParams is :articleId when set routes
			});
			console.log('$scope.article when findOne', $scope.article);
		};
	}
]);