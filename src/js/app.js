(function() {
    angular.module('RenderTreeApp', [])
        .directive('renderTree', function() {
            return {
                restrict: 'A',
                scope:{data: '='},
                templateUrl: './templates/tree.html',
                // template: '<span>pew</span>',
                controller: function ($scope) {}
            }
        })
        .directive('tabView', function() {
            return {
                restrict: 'A', 
                template: '<span>table here</span>'
            }
        })
        .controller('tree-controller', function ($http, $scope) {
            $http.get('./test-data/OrgChartData.json').success(function(data){
                $scope.data = data[0];
            });
        })
})();