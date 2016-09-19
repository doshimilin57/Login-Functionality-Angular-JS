// Login
(function() {
	'use strict';

	angular
		.module('login')
		.directive("jediLogin", jediLogin)
	;

	function jediLogin() {
		return {
			restrict: 'EA',
			templateUrl: '/local_components/login/partials/login.html',
			scope: false,
			controller: jediLoginController,
			controllerAs: 'vm',
			bindToController: true
		};
	};

	function jediLoginController($scope, $log, httpFactory,$location,$window,$state) {
		var vm = this;
		vm.myVariable = true;
		vm.myVariable = true;
		vm.loginContent = $scope.loginContent;
		vm.attemptLogin = attemptLogin;

		vm.loginDataFormPromise = httpFactory.invokeAapi('/stub-json/login.data.json','GET')
			vm.loginDataFormPromise
			.then(getLoginDataComplete)
			.catch(getLoginDataFailed);

		function getLoginDataComplete(response) {
			//vm.loginStatus =  response;
			vm.loginDataForm = response.sections[0];
		};

		function getLoginDataFailed(error) {
			$log.error('Failure loading: ', error);
		};

		function attemptLogin(login) {
			// $state.go('challenge');

				//vm.myVariable = false;

				// $window.location.href = "/#/challenge";
			var loginDetails = {};
			//var url = 'http://localhost:8000/pcos-web/login/submit';// local testing
			var url = '/stub-json/login1.json';
            //alert(login);
			// console.log(login);
			// if (isBlank(login.username) || isBlank(login.password)) {
			// 	vm.loginData.error = "One or more required fields were left blank";
			// 	return;
			// };

			vm.loginDataPromise =  httpFactory.invokeAapi(url,'GET')
				vm.loginDataPromise
				.then(attemptLoginComplete)
				.catch(attemptLoginFailed);

			function attemptLoginComplete(response) {
				vm.loginData =  response.Sections[0];
                //alert(vm.loginStatus);

				if (vm.loginData.status == "xyz")
				{
					vm.myVariable = false;
					$satate.go('challenge');

				}
				else if (vm.loginData.status == "abc")
				{
					$state.go('account');
				}

                else if (vm.loginData.status == "pqr")
                {
                	vm.myToggle = false;
                }
				//vm.loginData = Stat
				//console.log(response);
				// if (data) {
				// 	$state.go('account');
				// } else {
				// 	console.log("yes");
				// 	vm.loginData.user = '';
				// 	vm.loginData.password = '';
				// 	vm.loginData.error = 'User failed to login';
				// }
			};

			function attemptLoginFailed(error) {

				vm.loginData.error = "Error connecting to system";
				//$log.error('failure loading', error);
			};

		};

		function isBlank(input) {
			return (angular.isUndefined(input) || input === '' || input === null);
		};

	};

})();
