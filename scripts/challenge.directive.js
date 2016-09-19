(function() {
	'use strict';

	angular
		.module('challenge')
		.directive("jediChallenge", jediChallenge)
	;

	function jediChallenge() {
		return {
			restrict: 'EA',
			templateUrl: '/local_components/login/partials/login.html',
			scope: false,
			controller: jediChallengeController,
			controllerAs: 'vm',
			bindToController: true
		};
	};

    function jediChallengeController($scope, $log, httpFactory,$location,$window,$state) {
		var vm = this;

		vm.challengeContent = $scope.challengeContent;
		vm.attemptChallenge = attemptchallenge;

		console.log($scope.challengeContent);
        vm.challengeDataPromise = httpFactory.invokeAapi('/stub-json/challenge.data.json','GET')
			vm.challengeDataPromise
			.then(getchallengeDataComplete)
			.catch(getchallengeDataFailed);


			function getchallengeDataComplete(response) {
			vm.challengeData = response.sections[0];
		};

		function getchallengeDataFailed(error) {
			$log.error('Failure loading: ', error);
		};




		function attemptchallenge(challenge) {
			var vm = this;

			var ChallengeDetails = {};
			var url = 'http://musail182744.cof.ds.capitalone.com:8000/open-upf-refapp-login-web-jedi/login/submit';

			console.log(challenge);
			if (isBlank(challenge.username) || isBlank(challenge.password)) {
				vm.challengedata.error = "One or more required fields were left blank";
				return;
			};

			httpFactory.invokeAapi(url,'POST',login)
				.then(attemptchallengeComplete)
				.catch(attemptchallengeFailed);

			function getChallengecomplete(response) {
				console.log(response);
				// if (data) {
				// 	$state.go('account');
				// } else {
				// 	console.log("yes");
				// 	vm.loginData.user = '';
				// 	vm.loginData.password = '';
				// 	vm.loginData.error = 'User failed to login';
				// }
			};

			function attemptchallengeFailed(error) {
				vm.loginData.error = "Error connecting to system";
				$log.error('failure loading', error);
			};

		};

		function isBlank(input) {
			return (angular.isUndefined(input) || input === '' || input === null);
		};

	};

})();
