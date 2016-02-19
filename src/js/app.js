(function() {
    var app = angular.module('RenderTreeApp', []);

    app.directive('renderTree', function() {
            return {
                restrict: 'A',
                scope: {
                    data: '='
                },
                templateUrl: './templates/tree.html',
            }
        });

    app.directive('employees', function() {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    data: '='
                },
                templateUrl: './templates/employees.html',
                controller: function($scope){
                    console.dir($scope);
                },
            }
        });

    app.controller('tree-controller', function ($http, $scope) {

            function parseData (input) {
                if (input.unitOwner) {
                    $scope.table.push(input.unitOwner)
                };
                if (input.childUnits) {
                    for (var i=input.childUnits.length-1; i>=0; i--) {
                        parseData(input.childUnits[i]);
                    };
                };
            };

            $scope.table = [];
            $http.get('./test-data/OrgChartData.json').success(function(data){
                $scope.data = data[0];
                parseData($scope.data);
            });

            $scope.collapse = function($event) {
                for (var i=0; i < $event.path.length; i++) {
                    if ($event.path[i].tagName == 'LI') {
                        $event.path[i].classList.toggle('collapsed');
                        break;
                    };
                };
            };

        });
})();