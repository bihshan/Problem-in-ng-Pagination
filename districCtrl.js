
angular.module('myApp')
.controller('districCtrl', function($scope, $http) { 
  $scope.pageSize=5;
  $scope.currentPage=1;
     $http({
            method: 'get', 
            //url: '/getdistrics'
            url: '/Districtmodel'
            }).then(
                    function (response) {
                                            $scope.districs = response.data;
                                        },
                    function (error){
                                        console.log(error, 'can not get data.');
                                    })
                
    $scope.remove = function() {
        var oldList = $scope.districs;
        $scope.districs = [];
        var selectedIds = new Array();
        angular.forEach(oldList, function(x) {
                                                if (!x.done)
                                                    {                                               
                                                        $scope.districs.push(x);
                                                    }
                                                else
                                                    {
                                                        selectedIds.push(x.id);
                                                    }
        })
        promise = $http.get('/district/delete/?id='+ selectedIds);
        promise.success(
                         function (){
                                    }              
                          ).error(function () {
                                    alert("Error in delete");
        });
                                  
    }
})
.filter('startFrom', function(){
   
  return function(data,start){
    
     return data.slice(start); 
  }
})


