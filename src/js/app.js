(function() {
    angular.module('RenderTreeApp', [])
        .directive('renderTree', function() {
            return {
                restrict: 'A',
                scope: {
                    data: '='
                },
                templateUrl: './templates/tree.html',
                controller: function ($scope) {
                }
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
            $scope.collapse = function($event) {
                for (var i=0; i < $event.target.classList.length; i++) {
                    if ($event.path[i].tagName == 'LI') {
                        $event.path[i].classList.toggle('collapsed');
                        break;
                    }
                };
            };

        });
})();