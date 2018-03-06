var myUsers = angular.module('myUsers', []);
myUsers.controller('UsersCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


var loadUsers = function() {
  $http.get('/users').success(function(response) {
    $scope.name = response.name;
    $scope.email = response.email;
    $scope.number = response.number;
  });
};

refresh();
