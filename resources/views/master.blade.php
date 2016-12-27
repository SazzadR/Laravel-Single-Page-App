<!DOCTYPE html>
<html ng-app="myApp">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Gallery Application in Laravel and AngularJS</title>
	<link rel="stylesheet" type="text/css" href="{{ asset('bower_components/bootstrap/dist/css/bootstrap.min.css') }}">
	<link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">
	<script type="text/javascript">
		var baseUrl = "{{ url('/') }}/";
	</script>
</head>
<body>

	<div ng-view></div>

	<script src="{{ asset('bower_components/jquery/dist/jquery.min.js') }}"></script>
	<script src="{{ asset('bower_components/bootstrap/dist/js/bootstrap.min.js') }}"></script>
	<script src="{{ asset('bower_components/angular/angular.min.js') }}" type="text/javascript"></script>
	<script src="{{ asset('bower_components/angular-route/angular-route.min.js') }}" type="text/javascript"></script>
	<script src="{{ asset('bower_components/angular-cookies/angular-cookies.min.js') }}" type="text/javascript"></script>
	<script src="{{ asset('js/app.js') }}" type="text/javascript"></script>
	<script src="{{ asset('js/models.js') }}" type="text/javascript"></script>
	<script src="{{ asset('js/controllers.js') }}" type="text/javascript"></script>
</body>
</html>