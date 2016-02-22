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
        }
    });

    app.directive('pages', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: './templates/pages.html',
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

        function setPage(page) {
            $scope.currentPage = page-1;
        };

        function collapse($event) {
            if ($event.target.classList.contains('node-name')) {
                $event.target.parentNode.classList.toggle('collapsed')
            };
        };

        function goToName($event) {
            var name, index, contentsPage;
            if ($event.target.classList.contains('node-owner-name')) {
                name = $event.target.innerText;
                index = $scope.table.findIndex(function(unitOwner, index, array){
                    if (unitOwner.name == name) {
                        return true;
                    };
                });
                contentsPage = Math.floor(index/10);
                setPage(contentsPage+1);
            };
        };

        $scope.table = [];
        $scope.pages = [];
        $scope.currentPage = 0;

        $http.get('./test-data/OrgChartData.json').success(function(data){
            $scope.data = data[0];
            parseData($scope.data);
            $scope.pages = Array.apply(null, Array(Math.floor($scope.table.length /10))).map(function (_, i) {return i+1});
        });

        $scope.treeListener = function($event) {
            collapse($event);
            goToName($event);
        };

        $scope.pageBarSelect = function ($event) {
            setPage($event.target.innerText);
        }

    });
})();