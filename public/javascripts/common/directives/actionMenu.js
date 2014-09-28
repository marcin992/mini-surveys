/**
 * Created by Marcin on 2014-09-27.
 */

var common = angular.module('common');

common.directive('actionMenu', function() {
  return {
    restrict: 'E',
    scope: {
      items: '=',
      action: '&'
    },
    template: '<ul class="my-menu">' +
                '<a class="menu-item" ng-repeat="item in items" ng-href="{{item.href}}" ng-click="action({index: $index})">' +
                  '{{item.text}}' +
                '</a> ' +
              '</ul>'
  }
})