var app = angular.module('app', [
//'ngRoute'
'ui.router'
]);

var errorHandler = function(err){
    alert('Request error.');
    console.log(err);
}

app.controller('departmentCtrl', function($scope, $http, $rootScope/*, $stateParams*/){

  var url = '/department';
  $scope.title = 'Departments';
  $scope.departments = [];
  $scope.department = {};

  $http.get(url).then(function(res){
      $scope.departments = res.data;
  }, errorHandler);

  // method is called when user asks to save object
  $scope.create = function () {
      // don't re-persist existing relationships
      //$scope.truncate($scope.department, 2);

      $http.post(url, JSON.stringify($scope.department)).then(function(res){
        if (res.status===200){
          jQuery('#saveDepartmentModal').modal('hide');
          $scope.departments.push(res.data);
        } else {
          errorHandler(res.statusText)
        }
      }, errorHandler );

  };

  $scope.remove = function(department){
    $scope.department = department;
    jQuery('#deleteDepartmentConfirmation').modal('show');
  }

  $scope.confirmDelete = function (department) {
    $http.delete(url+'/'+department.id).then(function (res) {
            if (res.status===200){
                jQuery('#deleteDepartmentConfirmation').modal('hide');
                $scope.departments.splice($scope.getIndexById(department.id), 1);
                $scope.clear();
            }
        }, errorHandler);
  }

  $scope.clear = function () {
      $scope.department = {};
  };

  $scope.getIndexById = function(id){
      for (var i = 0; i < $scope.departments.length; i++){
          if (id == $scope.departments[i].id){
              return i;
          }
      };
      return -1;
  }


});

app.controller('subjectCtrl', function($scope, $http, $rootScope, $location/*, $route*/, $state){
  var url = '/subject';
  $scope.title = 'Subjects';
  $scope.subjects = [];
  $scope.subject = {};

  $http.get(url).then(function(res){
      $scope.subjects = res.data;
  }, errorHandler );

  $scope.remove = function(subject){
    $scope.subject = subject;
    jQuery('#deleteSubjectConfirmation').modal('show');
  }

  $scope.subjectDetail = function(jsonId){
    //$state.transitionTo('subject');
    $state.go('subjectDetail', jsonId);
  }

  $scope.clear = function () {
      $scope.subject = {};
  };

  $scope.create = function () {
      // don't re-persist existing relationships
      //$scope.truncate($scope.subject, 2);

      $http.post(url, JSON.stringify($scope.subject)).then(function(res){
        if (res.status===200){
          jQuery('#saveSubjectModal').modal('hide');
          $scope.subjects.push(res.data);
        } else {
          errorHandler(res.statusText)
        }
      }, errorHandler);
  };

  $scope.getIndexById = function(id){
      for (var i = 0; i < $scope.subjects.length; i++){
          if (id == $scope.subjects[i].id){
              return i;
          }
      };
      return -1;
  }

});

app.controller('subjectDetailCtrl', function($scope, $http, $rootScope, $stateParams, $state, $location){
    var url = '/subject';
    $scope.title = 'Subject Detail';
    $scope.subject = {};

    $http.get(url+'/'+$stateParams.id).then(function(res){
        $scope.subject = res.data;
    }, errorHandler);

  $scope.save = function () {
      // don't re-persist existing relationships
      //$scope.truncate($scope.subject, 2);

      $http.post(url, JSON.stringify($scope.subject)).then(function(res){
        if (res.status===200){
            $state.go('subject');
          //jQuery('#saveSubjectModal').modal('hide');
          //$scope.subjects.push(res.data);
        } else {
          errorHandler(res.statusText)
        }
      }, errorHandler);
  };

  $scope.delete = function (subject) {
    $http.delete(url+'/'+subject.id).then(function (res) {
        if (res.status===200){
            $state.go('subject');
            //jQuery('#deleteSubjectConfirmation').modal('hide');
            //$scope.subjects.splice($scope.getIndexById(subject.id), 1);
            //$scope.clear();
        }
    }, errorHandler);
  }

});

app.controller('teacherCtrl', function($scope, $rootScope, $http){
  var url = '/teacher';
  var teachers = [];

  $http.get(url).then(function(res){
      $scope.teachers = res.data;
  }, errorHandler );


});
app.controller('courseCtrl', function($scope, $rootScope){
});
app.controller('studentCtrl', function($scope, $rootScope){
});

// Routes:
  //department
  //subject
  //teacher
  //course
  //student

// Routes
app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
  .state('department', {
    url: '/department',
    templateUrl: '/html/department.html',
    controller: 'departmentCtrl'
  })
  .state('subject', {
    url: '/subject',
    templateUrl: '/html/subject.html',
    controller: 'subjectCtrl'
  })
  .state('subjectDetail', {
    url: '/subject-detail',
    templateUrl: '/html/subject-detail.html',
    controller: 'subjectDetailCtrl',
    params: {
        id: null
    }
  })
  .state('teacher', {
    url: '/teacher',
    templateUrl: '/html/teacher.html',
    controller: 'teacherCtrl'
  })
  .state('course', {
    url: '/course',
    templateUrl: '/html/course.html',
    controller: 'courseCtrl'
  })
  .state('student', {
    url: '/student',
    templateUrl: '/html/student.html',
    controller: 'studentCtrl'
  })
  .state('root', {
    url: '/',
    template: '<h1>Welcome to Neo4j University</h1>'
  });
  $urlRouterProvider.otherwise('/');
});
